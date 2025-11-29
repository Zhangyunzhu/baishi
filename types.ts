/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: string;
  category: 'painting' | 'porcelain' | 'object';
  image: string;
  description: string;
  dimensions: string;
  material: string;
  details?: string[]; // URLs for detail shots
}

export interface Story {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
}

export type LayoutMode = 'grid' | 'list';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Artist {
  id: string;
  name: string;
  genre: string;
  day: string;
  image: string;
}
