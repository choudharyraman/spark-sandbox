import { Template } from '@/types/sandbox';
import ecommercePreview from '@/assets/ecommerce-preview.png';
import saasPreview from '@/assets/saas-preview.png';
import crmPreview from '@/assets/crm-preview.png';

export const mockTemplates: Template[] = [
  {
    id: 'ecommerce-store',
    name: 'Modern E-Commerce',
    description: 'A full-featured online store with product catalog, cart, checkout, and admin dashboard.',
    category: 'E-Commerce',
    thumbnail: ecommercePreview,
    author: 'Lovable Team',
    popularity: 4850,
    tags: ['store', 'payments', 'inventory', 'analytics'],
    schema: {
      tables: [
        {
          name: 'products',
          rowCount: 50,
          fields: [
            { name: 'id', type: 'string', nullable: false, isPrimary: true },
            { name: 'name', type: 'string', nullable: false },
            { name: 'price', type: 'currency', nullable: false },
            { name: 'description', type: 'string', nullable: true },
            { name: 'category', type: 'string', nullable: false },
            { name: 'stock', type: 'number', nullable: false },
            { name: 'image_url', type: 'url', nullable: true },
          ],
        },
        {
          name: 'customers',
          rowCount: 30,
          fields: [
            { name: 'id', type: 'string', nullable: false, isPrimary: true },
            { name: 'name', type: 'string', nullable: false },
            { name: 'email', type: 'email', nullable: false },
            { name: 'created_at', type: 'date', nullable: false },
          ],
        },
        {
          name: 'orders',
          rowCount: 100,
          fields: [
            { name: 'id', type: 'string', nullable: false, isPrimary: true },
            { name: 'customer_id', type: 'string', nullable: false, isForeignKey: true, foreignTable: 'customers' },
            { name: 'total', type: 'currency', nullable: false },
            { name: 'status', type: 'string', nullable: false },
            { name: 'created_at', type: 'date', nullable: false },
          ],
        },
      ],
      relationships: [
        { from: 'orders', to: 'customers', type: 'many-to-many' },
      ],
    },
  },
  {
    id: 'saas-dashboard',
    name: 'SaaS Analytics Dashboard',
    description: 'A powerful analytics dashboard with real-time metrics, user management, and billing integration.',
    category: 'SaaS',
    thumbnail: saasPreview,
    author: 'Lovable Team',
    popularity: 3920,
    tags: ['dashboard', 'analytics', 'charts', 'billing'],
    schema: {
      tables: [
        {
          name: 'users',
          rowCount: 25,
          fields: [
            { name: 'id', type: 'string', nullable: false, isPrimary: true },
            { name: 'name', type: 'string', nullable: false },
            { name: 'email', type: 'email', nullable: false },
            { name: 'role', type: 'string', nullable: false },
            { name: 'plan', type: 'string', nullable: false },
          ],
        },
        {
          name: 'events',
          rowCount: 500,
          fields: [
            { name: 'id', type: 'string', nullable: false, isPrimary: true },
            { name: 'user_id', type: 'string', nullable: false, isForeignKey: true, foreignTable: 'users' },
            { name: 'event_type', type: 'string', nullable: false },
            { name: 'timestamp', type: 'date', nullable: false },
            { name: 'metadata', type: 'json', nullable: true },
          ],
        },
        {
          name: 'metrics',
          rowCount: 90,
          fields: [
            { name: 'id', type: 'string', nullable: false, isPrimary: true },
            { name: 'date', type: 'date', nullable: false },
            { name: 'active_users', type: 'number', nullable: false },
            { name: 'revenue', type: 'currency', nullable: false },
            { name: 'signups', type: 'number', nullable: false },
          ],
        },
      ],
      relationships: [
        { from: 'events', to: 'users', type: 'many-to-many' },
      ],
    },
  },
  {
    id: 'crm-platform',
    name: 'CRM Platform',
    description: 'Complete customer relationship management with contacts, deals, pipeline, and activity tracking.',
    category: 'CRM',
    thumbnail: crmPreview,
    author: 'Lovable Team',
    popularity: 2850,
    tags: ['crm', 'contacts', 'deals', 'pipeline'],
    schema: {
      tables: [
        {
          name: 'contacts',
          rowCount: 40,
          fields: [
            { name: 'id', type: 'string', nullable: false, isPrimary: true },
            { name: 'name', type: 'string', nullable: false },
            { name: 'email', type: 'email', nullable: false },
            { name: 'company', type: 'string', nullable: true },
            { name: 'phone', type: 'string', nullable: true },
          ],
        },
        {
          name: 'companies',
          rowCount: 15,
          fields: [
            { name: 'id', type: 'string', nullable: false, isPrimary: true },
            { name: 'name', type: 'string', nullable: false },
            { name: 'industry', type: 'string', nullable: true },
            { name: 'size', type: 'string', nullable: true },
          ],
        },
        {
          name: 'deals',
          rowCount: 25,
          fields: [
            { name: 'id', type: 'string', nullable: false, isPrimary: true },
            { name: 'title', type: 'string', nullable: false },
            { name: 'value', type: 'currency', nullable: false },
            { name: 'stage', type: 'string', nullable: false },
            { name: 'contact_id', type: 'string', nullable: false, isForeignKey: true, foreignTable: 'contacts' },
          ],
        },
      ],
      relationships: [
        { from: 'deals', to: 'contacts', type: 'many-to-many' },
        { from: 'contacts', to: 'companies', type: 'many-to-many' },
      ],
    },
  },
  {
    id: 'blog-platform',
    name: 'Blog & Content Platform',
    description: 'A modern blogging platform with rich text editing, categories, comments, and SEO optimization.',
    category: 'Content',
    thumbnail: saasPreview,
    author: 'Community',
    popularity: 2100,
    tags: ['blog', 'content', 'cms', 'seo'],
  },
  {
    id: 'booking-system',
    name: 'Appointment Booking',
    description: 'Scheduling system with calendar integration, availability management, and notifications.',
    category: 'Booking',
    thumbnail: crmPreview,
    author: 'Community',
    popularity: 1850,
    tags: ['booking', 'calendar', 'scheduling', 'notifications'],
  },
  {
    id: 'social-network',
    name: 'Social Network Starter',
    description: 'Social platform foundation with profiles, posts, follows, and real-time messaging.',
    category: 'Social',
    thumbnail: ecommercePreview,
    author: 'Community',
    popularity: 1620,
    tags: ['social', 'messaging', 'profiles', 'real-time'],
  },
];

export const templateCategories = [
  'All',
  'E-Commerce',
  'SaaS',
  'CRM',
  'Content',
  'Booking',
  'Social',
];
