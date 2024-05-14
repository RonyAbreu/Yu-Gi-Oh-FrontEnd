export interface Card {
    name : string;
    type: string;
    attribute: string;
    desc: string;
    card_images: CardImages[];
    atk: number;
    def: number;
    level: number;
}

interface CardImages {
    image_url_small : string;
}