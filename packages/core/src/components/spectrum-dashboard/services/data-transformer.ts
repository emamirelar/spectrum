/**
 * Data Transformation Service
 * 
 * Provides powerful data transformation capabilities using JSONata.
 * Supports both simple field mapping and complex queries.
 */

import jsonata from 'jsonata';

export interface TransformConfig {
  /**
   * JSONata expression for transforming data
   * @example "$.{ 'label': product, 'value': revenue }"
   * @example "$[category='Electronics'].{ label: product, value: revenue }"
   */
  expression?: string;
  
  /**
   * Simple field mapping (alternative to expression)
   * Maps source fields to target fields
   * @example { "label": "product", "value": "revenue" }
   */
  mapping?: Record<string, string>;
  
  /**
   * JSONPath to extract data from nested response
   * @example "data.results"
   */
  path?: string;
}

export class DataTransformer {
  /**
   * Transform data using JSONata expression or simple mapping
   */
  static transform(data: any, config?: TransformConfig): any {
    if (!config) {
      return data;
    }
    
    // Step 1: Extract from nested path if specified
    let workingData = data;
    if (config.path) {
      workingData = this.extractByPath(data, config.path);
    }
    
    // Step 2: Apply JSONata expression if specified
    if (config.expression) {
      try {
        const expression = jsonata(config.expression);
        return expression.evaluate(workingData);
      } catch (error) {
        console.error('[DataTransformer] JSONata expression failed:', error);
        console.error('[DataTransformer] Expression:', config.expression);
        console.error('[DataTransformer] Data:', workingData);
        throw new Error(`Transform failed: ${error.message}`);
      }
    }
    
    // Step 3: Apply simple field mapping if specified
    if (config.mapping) {
      return this.applyMapping(workingData, config.mapping);
    }
    
    return workingData;
  }
  
  /**
   * Extract data from nested object using dot notation path
   * @example extractByPath({ data: { results: [1,2,3] } }, "data.results") => [1,2,3]
   */
  private static extractByPath(data: any, path: string): any {
    const keys = path.split('.');
    let result = data;
    
    for (const key of keys) {
      if (result === null || result === undefined) {
        return undefined;
      }
      result = result[key];
    }
    
    return result;
  }
  
  /**
   * Apply simple field mapping to data
   * Handles both arrays of objects and single objects
   */
  private static applyMapping(data: any, mapping: Record<string, string>): any {
    if (Array.isArray(data)) {
      return data.map(item => this.mapObject(item, mapping));
    } else if (typeof data === 'object' && data !== null) {
      return this.mapObject(data, mapping);
    }
    
    return data;
  }
  
  /**
   * Map a single object using field mapping
   */
  private static mapObject(obj: any, mapping: Record<string, string>): any {
    const result: any = {};
    
    for (const [targetField, sourceField] of Object.entries(mapping)) {
      result[targetField] = obj[sourceField];
    }
    
    return result;
  }
  
  /**
   * Transform array of objects to Chart.js format using config
   */
  static toChartData(data: any[], config: {
    labelField?: string;
    valueField?: string;
    datasetLabel?: string;
  }): { labels: string[], datasets: any[] } {
    if (!Array.isArray(data) || data.length === 0) {
      return { labels: [], datasets: [] };
    }
    
    const labelField = config.labelField || Object.keys(data[0])[0];
    const valueField = config.valueField;
    
    const labels = data.map(item => String(item[labelField] || ''));
    const datasets = [];
    
    if (valueField) {
      // Single value field specified
      datasets.push({
        label: config.datasetLabel || valueField,
        data: data.map(item => Number(item[valueField]) || 0),
      });
    } else {
      // Auto-detect numeric fields
      const numericFields = Object.keys(data[0]).filter(key => 
        key !== labelField && typeof data[0][key] === 'number'
      );
      
      numericFields.forEach(field => {
        datasets.push({
          label: field,
          data: data.map(item => Number(item[field]) || 0),
        });
      });
    }
    
    return { labels, datasets };
  }
}



