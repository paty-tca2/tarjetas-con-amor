export type CardTemplate = {
  id: string;
  imageUrl: string;
  pages: {
    pageNumber: number;
    staticPlaceholders: {
      color: string;
      font: string;
      id: string;
      type: 'image' | 'text';
      position: { x: number; y: number };
      size: { width: number; height: number };
      content?: string;
      placeholder?: string;
    }[];
  }[];
};

export const cardTemplates: CardTemplate[] = [
  { 
    id: '1', 
    imageUrl: '/templates/tarjeta1.png',
    pages: [
      {
        pageNumber: 1,
        staticPlaceholders: [
          {
            id: 'title',
            type: 'text',
            position: { x: 50, y: 30 },
            size: { width: 300, height: 50 },
            content: '',
            placeholder: 'Hola',
            font: "Lust Script", // Changed to Lust Script
            color: '#04D9B2', // Changed to #04D9B2
          },
          // ... other placeholders for this page
        ]
      },
      // ... other pages
    ]
  },
  { 
    id: '2', 
    imageUrl: '/templates/tarjeta2.png',
    pages: [
      {
        pageNumber: 1,
        staticPlaceholders: []
      }
    ]
  },
  { 
    id: '3', 
    imageUrl: '/templates/tarjeta3.png',
    pages: [
      {
        pageNumber: 1,
        staticPlaceholders: []
      }
    ]
  },
  {
    id: '4',
    imageUrl: '/templates/tarjeta4.png',
    pages: []
  },
];
