import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// ==============================================
// Tagging and Labeling
// ==============================================

export const TaggingSystem = {
  args: {
    variant: 'secondary'
  },
  render: () => html`
    <div style="max-width: 800px;">
      <div style="margin-bottom: 2rem;">
        <h3 style="color: var(--spectrum-color-on-surface); margin-bottom: 1rem;">Blog Post Tags</h3>
        <p style="color: var(--spectrum-color-on-surface-variant); margin-bottom: 1rem;">
          Content categorization and discovery through tagging
        </p>
      </div>
      
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem;">
        <spectrum-chip
          variant="secondary"
          label="JavaScript"
          leadingIcon="code"
          @chipAction=${(e: CustomEvent) => action('JavaScript Tag')(e.detail)}
        ></spectrum-chip>
        
        <spectrum-chip
          variant="secondary"
          label="Web Development"
          leadingIcon="language"
          @chipAction=${(e: CustomEvent) => action('Web Dev Tag')(e.detail)}
        ></spectrum-chip>
        
        <spectrum-chip
          variant="secondary"
          label="Tutorial"
          leadingIcon="school"
          @chipAction=${(e: CustomEvent) => action('Tutorial Tag')(e.detail)}
        ></spectrum-chip>
        
        <spectrum-chip
          variant="secondary"
          label="Beginner"
          leadingIcon="star"
          @chipAction=${(e: CustomEvent) => action('Beginner Tag')(e.detail)}
        ></spectrum-chip>
        
        <spectrum-chip
          variant="secondary"
          label="Frontend"
          leadingIcon="web"
          @chipAction=${(e: CustomEvent) => action('Frontend Tag')(e.detail)}
        ></spectrum-chip>
      </div>
      
      <div style="padding: 1rem; background: var(--spectrum-color-surface-variant); border-radius: 8px;">
        <h4 style="margin-bottom: 0.5rem;">Article Preview</h4>
        <p style="margin: 0; color: var(--spectrum-color-on-surface-variant);">
          "Getting Started with Modern JavaScript: A Comprehensive Guide for Beginners"
        </p>
      </div>
    </div>
  `
};

export const SkillsPortfolio = {
  args: {
    variant: 'primary'
  },
  render: () => html`
    <div style="max-width: 600px;">
      <div style="margin-bottom: 2rem;">
        <h3 style="color: var(--spectrum-color-on-surface); margin-bottom: 1rem;">Professional Skills</h3>
        <p style="color: var(--spectrum-color-on-surface-variant); margin-bottom: 1rem;">
          Showcasing expertise and competencies
        </p>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        
        <div>
          <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface);">Programming Languages</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <spectrum-chip
              variant="primary"
              label="TypeScript"
              leadingIcon="code"
              selected="true"
              @chipAction=${(e: CustomEvent) => action('TypeScript Skill')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="primary"
              label="Python"
              leadingIcon="code"
              selected="true"
              @chipAction=${(e: CustomEvent) => action('Python Skill')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="primary"
              label="Rust"
              leadingIcon="code"
              @chipAction=${(e: CustomEvent) => action('Rust Skill')(e.detail)}
            ></spectrum-chip>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface);">Frameworks & Tools</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <spectrum-chip
              variant="secondary"
              label="React"
              leadingIcon="web"
              selected="true"
              @chipAction=${(e: CustomEvent) => action('React Skill')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="secondary"
              label="Node.js"
              leadingIcon="terminal"
              selected="true"
              @chipAction=${(e: CustomEvent) => action('Node.js Skill')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="secondary"
              label="Docker"
              leadingIcon="developer_board"
              @chipAction=${(e: CustomEvent) => action('Docker Skill')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="secondary"
              label="AWS"
              leadingIcon="cloud"
              @chipAction=${(e: CustomEvent) => action('AWS Skill')(e.detail)}
            ></spectrum-chip>
          </div>
        </div>
        
      </div>
    </div>
  `
};

// ==============================================
// E-commerce Applications
// ==============================================

export const ProductFilters = {
  args: {
    variant: 'filter'
  },
  render: () => html`
    <div style="max-width: 800px;">
      <div style="margin-bottom: 2rem;">
        <h3 style="color: var(--spectrum-color-on-surface); margin-bottom: 1rem;">Product Filters</h3>
        <p style="color: var(--spectrum-color-on-surface-variant); margin-bottom: 1rem;">
          Filter and refine product search results
        </p>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        
        <div>
          <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Category</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <spectrum-chip
              variant="filter"
              label="All Products"
              selected="true"
              @chipAction=${(e: CustomEvent) => action('All Products Filter')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="filter"
              label="Electronics"
              leadingIcon="devices"
              @chipAction=${(e: CustomEvent) => action('Electronics Filter')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="filter"
              label="Clothing"
              leadingIcon="checkroom"
              @chipAction=${(e: CustomEvent) => action('Clothing Filter')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="filter"
              label="Books"
              leadingIcon="menu_book"
              @chipAction=${(e: CustomEvent) => action('Books Filter')(e.detail)}
            ></spectrum-chip>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Price Range</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <spectrum-chip
              variant="filter"
              label="Under $25"
              leadingIcon="attach_money"
              @chipAction=${(e: CustomEvent) => action('Under $25 Filter')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="filter"
              label="$25 - $100"
              leadingIcon="attach_money"
              selected="true"
              @chipAction=${(e: CustomEvent) => action('$25-100 Filter')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="filter"
              label="Over $100"
              leadingIcon="attach_money"
              @chipAction=${(e: CustomEvent) => action('Over $100 Filter')(e.detail)}
            ></spectrum-chip>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Features</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <spectrum-chip
              variant="filter"
              label="Free Shipping"
              leadingIcon="local_shipping"
              selected="true"
              @chipAction=${(e: CustomEvent) => action('Free Shipping Filter')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="filter"
              label="In Stock"
              leadingIcon="inventory"
              @chipAction=${(e: CustomEvent) => action('In Stock Filter')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="filter"
              label="On Sale"
              leadingIcon="local_offer"
              @chipAction=${(e: CustomEvent) => action('On Sale Filter')(e.detail)}
            ></spectrum-chip>
          </div>
        </div>
        
      </div>
    </div>
  `
};

export const ShoppingCart = {
  args: {
    variant: 'input'
  },
  render: () => html`
    <div style="max-width: 600px;">
      <div style="margin-bottom: 2rem;">
        <h3 style="color: var(--spectrum-color-on-surface); margin-bottom: 1rem;">Shopping Cart Items</h3>
        <p style="color: var(--spectrum-color-on-surface-variant); margin-bottom: 1rem;">
          Selected items with easy removal
        </p>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        
        <spectrum-chip
          variant="input"
          label="Wireless Headphones - $89.99"
          leadingIcon="headphones"
          showTrailingIcon="true"
          size="large"
          @chipAction=${(e: CustomEvent) => action('Remove Headphones')(e.detail)}
        ></spectrum-chip>
        
        <spectrum-chip
          variant="input"
          label="JavaScript Programming Book - $29.99"
          leadingIcon="menu_book"
          showTrailingIcon="true"
          size="large"
          @chipAction=${(e: CustomEvent) => action('Remove Book')(e.detail)}
        ></spectrum-chip>
        
        <spectrum-chip
          variant="input"
          label="Coffee Mug - $12.99"
          leadingIcon="coffee"
          showTrailingIcon="true"
          size="large"
          @chipAction=${(e: CustomEvent) => action('Remove Mug')(e.detail)}
        ></spectrum-chip>
        
      </div>
      
      <div style="margin-top: 2rem; padding: 1rem; background: var(--spectrum-color-surface-variant); border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: bold; color: var(--spectrum-color-on-surface);">Total: $132.97</span>
          <spectrum-chip
            variant="primary"
            label="Checkout"
            leadingIcon="shopping_cart"
            ripple="true"
            @chipAction=${(e: CustomEvent) => action('Proceed to Checkout')(e.detail)}
          ></spectrum-chip>
        </div>
      </div>
    </div>
  `
};

// ==============================================
// Contact and Communication
// ==============================================

export const ContactManagement = {
  args: {
    variant: 'input'
  },
  render: () => html`
    <div style="max-width: 700px;">
      <div style="margin-bottom: 2rem;">
        <h3 style="color: var(--spectrum-color-on-surface); margin-bottom: 1rem;">Contact Management</h3>
        <p style="color: var(--spectrum-color-on-surface-variant); margin-bottom: 1rem;">
          Managing recipients and team members
        </p>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        
        <div>
          <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Email Recipients</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <spectrum-chip
              variant="input"
              label="john.doe@company.com"
              leadingIcon="email"
              showTrailingIcon="true"
              @chipAction=${(e: CustomEvent) => action('Remove John')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="input"
              label="sarah.wilson@team.com"
              leadingIcon="email"
              showTrailingIcon="true"
              @chipAction=${(e: CustomEvent) => action('Remove Sarah')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="input"
              label="mike.johnson@dept.com"
              leadingIcon="email"
              showTrailingIcon="true"
              @chipAction=${(e: CustomEvent) => action('Remove Mike')(e.detail)}
            ></spectrum-chip>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Team Members</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <spectrum-chip
              variant="input"
              label="Design Team"
              leadingIcon="palette"
              showTrailingIcon="true"
              @chipAction=${(e: CustomEvent) => action('Remove Design Team')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="input"
              label="Development Team"
              leadingIcon="code"
              showTrailingIcon="true"
              @chipAction=${(e: CustomEvent) => action('Remove Dev Team')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="input"
              label="Project Managers"
              leadingIcon="manage_accounts"
              showTrailingIcon="true"
              @chipAction=${(e: CustomEvent) => action('Remove PM Team')(e.detail)}
            ></spectrum-chip>
          </div>
        </div>
        
      </div>
    </div>
  `
};

// ==============================================
// Social Media and Content
// ==============================================

export const SocialMediaTags = {
  args: {
    variant: 'suggestion'
  },
  render: () => html`
    <div style="max-width: 600px;">
      <div style="margin-bottom: 2rem;">
        <h3 style="color: var(--spectrum-color-on-surface); margin-bottom: 1rem;">Social Media Post</h3>
        <p style="color: var(--spectrum-color-on-surface-variant); margin-bottom: 1rem;">
          Suggested hashtags and topics for better reach
        </p>
      </div>
      
      <div style="padding: 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px; margin-bottom: 1.5rem;">
        <p style="margin: 0; color: var(--spectrum-color-on-surface);">
          Just finished an amazing web development project! 🚀 So excited to share what we've built...
        </p>
      </div>
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Suggested Tags</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <spectrum-chip
            variant="suggestion"
            label="#webdevelopment"
            leadingIcon="tag"
            @chipAction=${(e: CustomEvent) => action('Add #webdevelopment')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="suggestion"
            label="#javascript"
            leadingIcon="tag"
            @chipAction=${(e: CustomEvent) => action('Add #javascript')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="suggestion"
            label="#coding"
            leadingIcon="tag"
            @chipAction=${(e: CustomEvent) => action('Add #coding')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="suggestion"
            label="#tech"
            leadingIcon="tag"
            @chipAction=${(e: CustomEvent) => action('Add #tech')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="suggestion"
            label="#project"
            leadingIcon="tag"
            @chipAction=${(e: CustomEvent) => action('Add #project')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="suggestion"
            label="#frontend"
            leadingIcon="tag"
            @chipAction=${(e: CustomEvent) => action('Add #frontend')(e.detail)}
          ></spectrum-chip>
        </div>
      </div>
    </div>
  `
};

// ==============================================
// Workflow and Productivity
// ==============================================

export const TaskManagement = {
  args: {
    variant: 'filter'
  },
  render: () => html`
    <div style="max-width: 800px;">
      <div style="margin-bottom: 2rem;">
        <h3 style="color: var(--spectrum-color-on-surface); margin-bottom: 1rem;">Task Management Dashboard</h3>
        <p style="color: var(--spectrum-color-on-surface-variant); margin-bottom: 1rem;">
          Filter and organize tasks by status and priority
        </p>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        
        <div>
          <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Task Status</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <spectrum-chip
              variant="filter"
              label="All Tasks"
              selected="true"
              @chipAction=${(e: CustomEvent) => action('All Tasks Filter')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="filter"
              label="To Do"
              leadingIcon="radio_button_unchecked"
              @chipAction=${(e: CustomEvent) => action('To Do Filter')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="filter"
              label="In Progress"
              leadingIcon="schedule"
              @chipAction=${(e: CustomEvent) => action('In Progress Filter')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="filter"
              label="Completed"
              leadingIcon="check_circle"
              @chipAction=${(e: CustomEvent) => action('Completed Filter')(e.detail)}
            ></spectrum-chip>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Priority Level</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <spectrum-chip
              variant="filter"
              label="High Priority"
              leadingIcon="priority_high"
              @chipAction=${(e: CustomEvent) => action('High Priority Filter')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="filter"
              label="Medium Priority"
              leadingIcon="remove"
              @chipAction=${(e: CustomEvent) => action('Medium Priority Filter')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="filter"
              label="Low Priority"
              leadingIcon="keyboard_arrow_down"
              @chipAction=${(e: CustomEvent) => action('Low Priority Filter')(e.detail)}
            ></spectrum-chip>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Quick Actions</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <spectrum-chip
              variant="assist"
              label="Add New Task"
              leadingIcon="add"
              @chipAction=${(e: CustomEvent) => action('Add New Task')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="assist"
              label="Bulk Complete"
              leadingIcon="done_all"
              @chipAction=${(e: CustomEvent) => action('Bulk Complete')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="assist"
              label="Export Tasks"
              leadingIcon="download"
              @chipAction=${(e: CustomEvent) => action('Export Tasks')(e.detail)}
            ></spectrum-chip>
          </div>
        </div>
        
      </div>
    </div>
  `
};

// ==============================================
// Search and Discovery
// ==============================================

export const SearchInterface = {
  args: {
    variant: 'suggestion'
  },
  render: () => html`
    <div style="max-width: 700px;">
      <div style="margin-bottom: 2rem;">
        <h3 style="color: var(--spectrum-color-on-surface); margin-bottom: 1rem;">Search Interface</h3>
        <p style="color: var(--spectrum-color-on-surface-variant); margin-bottom: 1rem;">
          Search suggestions and recent searches
        </p>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        
        <div>
          <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Recent Searches</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <spectrum-chip
              variant="secondary"
              label="machine learning algorithms"
              leadingIcon="history"
              @chipAction=${(e: CustomEvent) => action('Recent: ML Algorithms')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="secondary"
              label="web development trends"
              leadingIcon="history"
              @chipAction=${(e: CustomEvent) => action('Recent: Web Dev Trends')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="secondary"
              label="cloud computing services"
              leadingIcon="history"
              @chipAction=${(e: CustomEvent) => action('Recent: Cloud Computing')(e.detail)}
            ></spectrum-chip>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Popular Searches</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <spectrum-chip
              variant="suggestion"
              label="AI and automation"
              leadingIcon="auto_awesome"
              @chipAction=${(e: CustomEvent) => action('Popular: AI Automation')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="suggestion"
              label="cryptocurrency news"
              leadingIcon="currency_bitcoin"
              @chipAction=${(e: CustomEvent) => action('Popular: Crypto News')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="suggestion"
              label="remote work tools"
              leadingIcon="work_from_home"
              @chipAction=${(e: CustomEvent) => action('Popular: Remote Tools')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="suggestion"
              label="data visualization"
              leadingIcon="bar_chart"
              @chipAction=${(e: CustomEvent) => action('Popular: Data Viz')(e.detail)}
            ></spectrum-chip>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Trending Topics</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <spectrum-chip
              variant="primary"
              label="🔥 ChatGPT integration"
              leadingIcon="trending_up"
              @chipAction=${(e: CustomEvent) => action('Trending: ChatGPT')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="primary"
              label="🔥 Sustainable tech"
              leadingIcon="trending_up"
              @chipAction=${(e: CustomEvent) => action('Trending: Sustainable Tech')(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="primary"
              label="🔥 Web3 development"
              leadingIcon="trending_up"
              @chipAction=${(e: CustomEvent) => action('Trending: Web3')(e.detail)}
            ></spectrum-chip>
          </div>
        </div>
        
      </div>
    </div>
  `
}; 