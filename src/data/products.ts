export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: 'alfajores' | 'chocolates' | 'packs' | 'otros';
    image: string; // Main image for cards
    images?: string[]; // Gallery images
    ingredients?: string;
    portions?: string;
    isNew?: boolean;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Pack Halloween Deluxe',
        description: 'Caja temática con 6 alfajores decorados, 4 bombones y sorpresas espeluznantes.',
        price: 15000,
        category: 'packs',
        image: 'https://images.unsplash.com/photo-1632689531668-243e3873499c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1632689531668-243e3873499c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1599599810769-bcde5a8158fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1548695607-9c73430ba065?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        ingredients: 'Harina de trigo, dulce de leche, chocolate blanco, chocolate semiamargo, colorantes comestibles, nueces.',
        portions: '10 unidades (6 alfajores, 4 bombones)',
        isNew: true,
    },
    {
        id: '2',
        name: 'Alfajores de Maicena',
        description: 'Clásicos alfajores de maicena rellenos con abundante dulce de leche y coco.',
        price: 8000,
        category: 'alfajores',
        image: 'https://images.unsplash.com/photo-1565057338586-42939366118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1565057338586-42939366118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1528690855322-2621cb07c4e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1491223933092-23769133bd57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        ingredients: 'Maicena, harina, dulce de leche, coco rallado, manteca, azúcar impalpable.',
        portions: 'Caja de 12 unidades',
    },
    {
        id: '3',
        name: 'Bombones Surtidos',
        description: 'Selección de 12 bombones de chocolate belga con rellenos frutales.',
        price: 12000,
        category: 'chocolates',
        image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1549007994-cb92caebd54b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1481391319762-47dff72954d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1548907040-4baa42d10919?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        ingredients: 'Chocolate belga 70%, chocolate con leche, pasta de avellanas, pulpa de maracuyá, frambuesa, crema.',
        portions: '12 unidades',
    },
    {
        id: '4',
        name: 'Caja Regalo Premium',
        description: 'La combinación perfecta: 4 alfajores, 6 bombones y una tableta artesanal.',
        price: 20000,
        category: 'packs',
        image: 'https://images.unsplash.com/photo-1549007953-2f2dc0b24019?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1549007953-2f2dc0b24019?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1599599810769-bcde5a8158fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        ingredients: 'Variado: contiene gluten, lácteos y frutos secos.',
        portions: 'Para compartir (2-3 personas)',
    }
];
