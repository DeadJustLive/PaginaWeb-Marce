export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: 'alfajores' | 'chocolates' | 'packs' | 'otros';
    image: string;
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
        isNew: true,
    },
    {
        id: '2',
        name: 'Alfajores de Maicena',
        description: 'Clásicos alfajores de maicena rellenos con abundante dulce de leche y coco.',
        price: 8000,
        category: 'alfajores',
        image: 'https://images.unsplash.com/photo-1565057338586-42939366118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: '3',
        name: 'Bombones Surtidos',
        description: 'Selección de 12 bombones de chocolate belga con rellenos frutales.',
        price: 12000,
        category: 'chocolates',
        image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: '4',
        name: 'Caja Regalo Premium',
        description: 'La combinación perfecta: 4 alfajores, 6 bombones y una tableta artesanal.',
        price: 20000,
        category: 'packs',
        image: 'https://images.unsplash.com/photo-1549007953-2f2dc0b24019?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    }
];
