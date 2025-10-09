-- Data generate by deepseek V3

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `mysample` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `mysample`;

DROP TABLE IF EXISTS `animals`;
CREATE TABLE `animals` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `scientific_name` TEXT NOT NULL,
  `common_name` TEXT NOT NULL,
  `kingdom` TEXT,
  `phylum` TEXT,
  `class` TEXT,
  `characteristics` JSON,
  `conservation_status` TEXT,
  `created_at` datetime NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 1. African Elephant
INSERT INTO animals VALUES(
    NULL,
    'Loxodonta africana',
    'African Elephant',
    'Animalia',
    'Chordata',
    'Mammalia',
    '{"habitat": "Savannas, forests","diet": "Herbivorous","lifespan": "60-70 years","size": {"height": "3-4 m", "weight": "4000-7000 kg"},"behavior": ["Social", "Matriarchal"],"special_features": ["Trunk", "Large ears", "Ivory tusks"]}',
    'Vulnerable',
    NULL
);

-- 2. Bengal Tiger
INSERT INTO animals VALUES(
    NULL,
    'Panthera tigris tigris',
    'Bengal Tiger',
    'Animalia',
    'Chordata',
    'Mammalia',
    '{"habitat": "Tropical forests","diet": "Carnivorous","lifespan": "8-10 years","size": {"length": "2.7-3.1 m", "weight": "180-258 kg"},"behavior": ["Solitary", "Nocturnal"],"special_features": ["Striped coat", "Powerful jaws"]}',
    'Endangered',
    NULL
);

-- 3. Giant Panda
INSERT INTO animals VALUES(
    NULL,
    'Ailuropoda melanoleuca',
    'Giant Panda',
    'Animalia',
    'Chordata',
    'Mammalia',
    '{"habitat": "Bamboo forests","diet": "99% bamboo","lifespan": "20 years","size": {"length": "1.2-1.9 m", "weight": "70-125 kg"},"behavior": ["Solitary", "Territorial"],"special_features": ["Black-and-white fur", "Pseudo-thumb"]}',
    'Vulnerable',
    NULL
);

-- 4. Bald Eagle
INSERT INTO animals VALUES(
    NULL,
    'Haliaeetus leucocephalus',
    'Bald Eagle',
    'Animalia',
    'Chordata',
    'Aves',
    '{"habitat": "Near water bodies","diet": ["Fish", "Small mammals"],"lifespan": "20 years","size": {"wingspan": "1.8-2.3 m", "weight": "3-6.3 kg"},"behavior": ["Monogamous", "Territorial"],"special_features": ["White head", "Powerful talons"]}',
    'Least Concern',
    NULL
);

-- 5. Green Sea Turtle
INSERT INTO animals VALUES(
    NULL,
    'Chelonia mydas',
    'Green Sea Turtle',
    'Animalia',
    'Chordata',
    'Reptilia',
    '{"habitat": "Tropical oceans","diet": "Herbivorous (adults)","lifespan": "80+ years","size": {"length": "1-1.2 m", "weight": "65-130 kg"},"behavior": ["Migratory", "Solitary"],"special_features": ["Streamlined shell", "Paddle-like flippers"]}',
    'Endangered',
    NULL
);

-- 6. Gray Wolf
INSERT INTO animals VALUES(
    NULL,
    'Canis lupus',
    'Gray Wolf',
    'Animalia',
    'Chordata',
    'Mammalia',
    '{"habitat": "Forests, tundra","diet": "Carnivorous","lifespan": "6-8 years","size": {"length": "1-1.5 m", "weight": "30-50 kg"},"behavior": ["Pack hunters", "Territorial"],"special_features": ["Complex howls", "Strong social bonds"]}',
    'Least Concern',
    NULL
);

-- 7. Poison Dart Frog
INSERT INTO animals VALUES(
    NULL,
    'Dendrobatidae',
    'Poison Dart Frog',
    'Animalia',
    'Chordata',
    'Amphibia',
    '{"habitat": "Tropical rainforests","diet": "Insects","lifespan": "3-15 years","size": {"length": "1.5-6 cm", "weight": "2-6 g"},"behavior": ["Diurnal", "Territorial"],"special_features": ["Bright colors", "Potent skin toxins"]}',
    'Varies by species',
    NULL
);

-- 8. Emperor Penguin
INSERT INTO animals VALUES(
    NULL,
    'Aptenodytes forsteri',
    'Emperor Penguin',
    'Animalia',
    'Chordata',
    'Aves',
    '{"habitat": "Antarctica","diet": ["Fish", "Squid", "Krill"],"lifespan": "15-20 years","size": {"height": "1.1-1.3 m", "weight": "22-45 kg"},"behavior": ["Colonial", "Excellent swimmers"],"special_features": ["Waterproof feathers", "Deep diving"]}',
    'Near Threatened',
    NULL
);

-- 9. Komodo Dragon
INSERT INTO animals VALUES(
    NULL,
    'Varanus komodoensis',
    'Komodo Dragon',
    'Animalia',
    'Chordata',
    'Reptilia',
    '{"habitat": "Indonesian islands","diet": ["Deer", "Pigs", "Carrion"],"lifespan": "30+ years","size": {"length": "2-3 m", "weight": "70-90 kg"},"behavior": ["Solitary", "Ambush predators"],"special_features": ["Venomous bite", "Armored skin"]}',
    'Endangered',
    NULL
);

-- 10. Monarch Butterfly
INSERT INTO animals VALUES(
    NULL,
    'Danaus plexippus',
    'Monarch Butterfly',
    'Animalia',
    'Chordata',
    'Insecta',
    '{"habitat": "Milkweed-rich areas","diet": "Nectar (adults), milkweed (larvae)","lifespan": "2-6 weeks (generations 1-3), 6-8 months (migratory generation)","size": {"wingspan": "9-10 cm", "weight": "0.25-0.75 g"},"behavior": ["Migratory", "Warning coloration"],"special_features": ["Bright orange wings", "Long-distance migration"]}',
    'Near Threatened',
    NULL
);
