/**
 * DataSourceManager - Centralized Data Fetching and Caching Service
 * 
 * Singleton service that manages all data operations for the dashboard:
 * - Request deduplication
 * - Caching with TTL
 * - Server-side and client-side filtering
 * - Cache invalidation
 */

import type {
  DataSourceConfig,
  DataSourceResult,
  CacheEntry,
  TransformRegistry,
} from '../types/dashboard.types';
import { DataTransformer } from './data-transformer';

/**
 * Singleton DataSourceManager class.
 * Manages data fetching, caching, and deduplication for dashboard widgets.
 */
export class DataSourceManager {
  private static instance: DataSourceManager;
  
  /** Cache storage: key -> CacheEntry */
  private cache: Map<string, CacheEntry> = new Map();
  
  /** Pending requests: key -> Promise */
  private pendingRequests: Map<string, Promise<any>> = new Map();
  
  /** Transform functions registry */
  private transformRegistry: TransformRegistry = {};
  
  /** Debug mode flag */
  private debug: boolean = false;
  
  /**
   * Private constructor for singleton pattern
   */
  private constructor() {
    this.log('DataSourceManager initialized');
  }
  
  /**
   * Get singleton instance
   */
  public static getInstance(): DataSourceManager {
    if (!DataSourceManager.instance) {
      DataSourceManager.instance = new DataSourceManager();
    }
    return DataSourceManager.instance;
  }
  
  /**
   * Enable or disable debug logging
   */
  public setDebug(enabled: boolean): void {
    this.debug = enabled;
  }
  
  /**
   * Register a transform function
   */
  public registerTransform(name: string, fn: (data: any) => any): void {
    this.transformRegistry[name] = fn;
    this.log(`Transform function registered: ${name}`);
  }
  
  /**
   * Get data from a data source with caching and deduplication.
   * 
   * @param config - Data source configuration
   * @param context - Global context for URL template variables
   * @param filters - Active filters for server-side filtering
   * @returns Promise resolving to DataSourceResult
   */
  public async getDataSource<T = any>(
    config: DataSourceConfig,
    context: Record<string, any> = {},
    filters: Record<string, any> = {}
  ): Promise<DataSourceResult<T>> {
    // Generate cache key based on config, context, and filters
    const cacheKey = this.generateCacheKey(config, context, filters);
    
    this.log(`getDataSource called for: ${config.id}`, { cacheKey, filters });
    
    // Check if data is in cache and fresh
    if (this.isCacheFresh(cacheKey, config.refreshInterval)) {
      const cached = this.cache.get(cacheKey)!;
      this.log(`Cache hit for: ${config.id}`);
      
      return {
        data: cached.data as T,
        loading: false,
        error: null,
        lastFetched: cached.timestamp,
        fromCache: true,
      };
    }
    
    // Check if request is already pending
    if (this.pendingRequests.has(cacheKey)) {
      this.log(`Request already pending for: ${config.id}, waiting...`);
      const data = await this.pendingRequests.get(cacheKey)!;
      
      return {
        data: data as T,
        loading: false,
        error: null,
        lastFetched: Date.now(),
        fromCache: false,
      };
    }
    
    // Fetch new data
    const fetchPromise = this.fetchData<T>(config, context, filters);
    this.pendingRequests.set(cacheKey, fetchPromise);
    
    try {
      const data = await fetchPromise;
      
      // Apply transformation if configured
      const transformedData = this.applyTransform(data, config.transformResponse);
      
      // Cache the result
      this.cache.set(cacheKey, {
        data: transformedData,
        timestamp: Date.now(),
        key: cacheKey,
      });
      
      this.log(`Data fetched and cached for: ${config.id}`);
      
      return {
        data: transformedData as T,
        loading: false,
        error: null,
        lastFetched: Date.now(),
        fromCache: false,
      };
    } catch (error) {
      this.log(`Error fetching data for: ${config.id}`, error);
      
      return {
        data: null as any,
        loading: false,
        error: error as Error,
        lastFetched: Date.now(),
        fromCache: false,
      };
    } finally {
      // Clean up pending request
      this.pendingRequests.delete(cacheKey);
    }
  }
  
  /**
   * Invalidate cache for a specific data source.
   * Next request will fetch fresh data.
   * 
   * @param dataSourceId - Data source ID to invalidate
   */
  public invalidateCache(dataSourceId: string): void {
    this.log(`Invalidating cache for: ${dataSourceId}`);
    
    // Remove all cache entries that match this data source ID
    for (const [key] of this.cache.entries()) {
      if (key.startsWith(`${dataSourceId}:`)) {
        this.cache.delete(key);
        this.log(`Deleted cache entry: ${key}`);
      }
    }
  }
  
  /**
   * Clear all cache entries
   */
  public clearAllCache(): void {
    this.log('Clearing all cache');
    this.cache.clear();
  }
  
  /**
   * Get cache statistics
   */
  public getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
  
  /**
   * Refresh a specific data source (bypass cache)
   * 
   * @param config - Data source configuration
   * @param context - Global context
   * @param filters - Active filters
   */
  public async refreshDataSource<T = any>(
    config: DataSourceConfig,
    context: Record<string, any> = {},
    filters: Record<string, any> = {}
  ): Promise<DataSourceResult<T>> {
    // Invalidate existing cache
    const cacheKey = this.generateCacheKey(config, context, filters);
    this.cache.delete(cacheKey);
    
    // Fetch fresh data
    return this.getDataSource<T>(config, context, filters);
  }
  
  /**
   * Generate unique cache key based on data source, context, and filters
   * 
   * @private
   */
  private generateCacheKey(
    config: DataSourceConfig,
    context: Record<string, any>,
    filters: Record<string, any>
  ): string {
    // Base key with data source ID
    const baseKey = config.id;
    
    // Hash context (for URL template variables)
    const contextHash = this.hashObject(context);
    
    // Hash filters (for server-side filtering)
    // Only include filters if server filtering is supported
    const filterHash = config.supportsServerFiltering
      ? this.hashObject(filters)
      : '';
    
    return `${baseKey}:${contextHash}:${filterHash}`;
  }
  
  /**
   * Simple object hash function for cache keys
   * 
   * @private
   */
  private hashObject(obj: Record<string, any>): string {
    if (Object.keys(obj).length === 0) return 'empty';
    
    // Sort keys for consistent hashing
    const sortedKeys = Object.keys(obj).sort();
    const values = sortedKeys.map(key => `${key}=${JSON.stringify(obj[key])}`);
    
    return values.join('|');
  }
  
  /**
   * Check if cache entry is fresh (within TTL)
   * 
   * @private
   */
  private isCacheFresh(cacheKey: string, refreshInterval: number = 300000): boolean {
    const entry = this.cache.get(cacheKey);
    
    if (!entry) return false;
    
    // refreshInterval of 0 means no caching
    if (refreshInterval === 0) return false;
    
    const age = Date.now() - entry.timestamp;
    const fresh = age < refreshInterval;
    
    this.log(`Cache check: ${cacheKey}`, { age, refreshInterval, fresh });
    
    return fresh;
  }
  
  /**
   * Fetch data from API endpoint
   * 
   * @private
   */
  private async fetchData<T>(
    config: DataSourceConfig,
    context: Record<string, any>,
    filters: Record<string, any>
  ): Promise<T> {
    // Build URL with template variables
    let url = this.interpolateUrl(config.endpoint, context);
    
    // Build request configuration
    const method = config.method || 'GET';
    const headers = this.buildHeaders(config, context);
    
    // Build query parameters
    const params = this.buildParams(config, filters);
    
    // Append query parameters to URL
    if (Object.keys(params).length > 0) {
      const queryString = new URLSearchParams(params).toString();
      url += (url.includes('?') ? '&' : '?') + queryString;
    }
    
    this.log(`Fetching: ${method} ${url}`, { headers, params });
    
    // Make the request
    const response = await fetch(url, {
      method,
      headers,
      body: method !== 'GET' ? JSON.stringify(params) : undefined,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    let data = await response.json();
    
    // Apply transformation if configured
    if (config.transform) {
      try {
        this.log('Applying transformation...', config.transform);
        data = DataTransformer.transform(data, config.transform);
        this.log('Transformation applied successfully', data);
      } catch (error) {
        console.error('[DataSourceManager] Transformation failed:', error);
        throw error;
      }
    }
    
    return data as T;
  }
  
  /**
   * Interpolate template variables in URL
   * 
   * @private
   * @example
   * "/api/products/${productId}" + { productId: "123" } => "/api/products/123"
   */
  private interpolateUrl(url: string, context: Record<string, any>): string {
    return url.replace(/\$\{(\w+)\}/g, (match, key) => {
      return context[key] !== undefined ? String(context[key]) : match;
    });
  }
  
  /**
   * Build request headers with template variable interpolation
   * 
   * @private
   */
  private buildHeaders(
    config: DataSourceConfig,
    context: Record<string, any>
  ): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(config.headers || {}),
    };
    
    // Interpolate context variables in headers
    for (const [key, value] of Object.entries(headers)) {
      headers[key] = this.interpolateUrl(value, context);
    }
    
    return headers;
  }
  
  /**
   * Build query parameters including filters
   * 
   * @private
   */
  private buildParams(
    config: DataSourceConfig,
    filters: Record<string, any>
  ): Record<string, any> {
    const params: Record<string, any> = { ...config.params };
    
    // Add server-side filters if supported
    if (config.supportsServerFiltering && config.filterParamMap) {
      for (const [filterKey, paramName] of Object.entries(config.filterParamMap)) {
        if (filters[filterKey] !== undefined) {
          params[paramName] = filters[filterKey];
        }
      }
    }
    
    return params;
  }
  
  /**
   * Apply transformation function to data if configured
   * 
   * @private
   */
  private applyTransform(data: any, transformName?: string): any {
    if (!transformName) return data;
    
    const transformFn = this.transformRegistry[transformName];
    
    if (!transformFn) {
      this.log(`Transform function not found: ${transformName}`);
      return data;
    }
    
    this.log(`Applying transform: ${transformName}`);
    
    try {
      return transformFn(data);
    } catch (error) {
      this.log(`Transform error: ${transformName}`, error);
      return data;
    }
  }
  
  /**
   * Debug logging utility
   * 
   * @private
   */
  private log(message: string, ...args: any[]): void {
    if (this.debug) {
      console.log(`[DataSourceManager] ${message}`, ...args);
    }
  }
}

// Export singleton instance getter
export const getDataSourceManager = () => DataSourceManager.getInstance();

