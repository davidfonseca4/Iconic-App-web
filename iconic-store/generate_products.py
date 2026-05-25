import json
import random

people = {
    "Music": [
        ("Michael Jackson", "1980s"), ("Madonna", "1980s"), ("Elvis Presley", "1950s"),
        ("Freddie Mercury", "1980s"), ("David Bowie", "1970s"), ("Kurt Cobain", "1990s"),
        ("Jimi Hendrix", "1960s"), ("John Lennon", "1970s"), ("Elton John", "1970s"),
        ("Prince", "1980s"), ("Frank Sinatra", "1950s"), ("Tupac Shakur", "1990s"),
        ("Eminem", "2000s"), ("Amy Winehouse", "2000s"), ("Lady Gaga", "2010s"),
        ("Taylor Swift", "2010s"), ("Beyonce", "2010s"), ("Bob Marley", "1970s")
    ],
    "Sports": [
        ("Muhammad Ali", "1970s"), ("Pelé", "1970s"), ("Diego Maradona", "1980s"),
        ("Michael Jordan", "1990s"), ("Kobe Bryant", "2000s"), ("Serena Williams", "2010s"),
        ("Roger Federer", "2000s"), ("Tiger Woods", "2000s"), ("Ayrton Senna", "1990s"),
        ("Lionel Messi", "2010s"), ("Cristiano Ronaldo", "2010s"), ("Usain Bolt", "2010s"),
        ("Tom Brady", "2010s"), ("LeBron James", "2010s"), ("Mike Tyson", "1990s")
    ],
    "Cinema": [
        ("Marilyn Monroe", "1950s"), ("James Dean", "1950s"), ("Audrey Hepburn", "1960s"),
        ("Marlon Brando", "1970s"), ("Bruce Lee", "1970s"), ("Al Pacino", "1980s"),
        ("Robert De Niro", "1980s"), ("Tom Cruise", "1990s"), ("Brad Pitt", "1990s"),
        ("Leonardo DiCaprio", "2000s"), ("Heath Ledger", "2000s"), ("Keanu Reeves", "1990s"),
        ("Clint Eastwood", "1960s"), ("Charlie Chaplin", "1950s"), ("Elizabeth Taylor", "1960s")
    ],
    "Royalty": [
        ("Princess Diana", "1990s"), ("Queen Elizabeth II", "1950s"), ("Grace Kelly", "1950s"),
        ("Prince Charles", "1980s"), ("Marie Antoinette", "1950s"), 
        ("King George VI", "1950s"), ("Tsar Nicholas II", "1950s")
    ],
    "Fashion": [
        ("Coco Chanel", "1950s"), ("Christian Dior", "1950s"), ("Gianni Versace", "1990s"),
        ("Yves Saint Laurent", "1970s"), ("Alexander McQueen", "2000s"), ("Karl Lagerfeld", "2010s"),
        ("Ralph Lauren", "1980s"), ("Giorgio Armani", "1980s"), ("Anna Wintour", "2000s")
    ]
}

item_templates = {
    "Music": ["Stage Worn Jacket", "Signed Guitar", "Handwritten Lyrics", "Tour Microphone", "Custom Sunglasses", "Platinum Record Award", "Personal Piano", "Concert Boots", "Studio Master Tape", "Iconic Hat"],
    "Sports": ["Match Worn Boots", "Championship Ring", "Signed Game Ball", "Tournament Racket", "Olympic Gold Medal", "Worn Jersey", "Boxing Gloves", "Racing Helmet", "Training Shoes", "Locker Room Towel"],
    "Cinema": ["Original Screenplay", "Screen-Worn Costume", "Director's Chair", "Prop Weapon", "Oscar Trophy Replica", "Vintage Camera", "Set Clapperboard", "Signed Movie Poster", "Personal Diary", "Sunglasses"],
    "Royalty": ["Diamond Tiara", "Gold Signet Ring", "Silk Evening Gown", "Ceremonial Sword", "Royal Decree Document", "Personal Fountain Pen", "Sapphire Brooch", "Velvet Cape", "Silver Tea Set", "Pearl Necklace"],
    "Fashion": ["Runway Sketch", "Met Gala Dress", "Iconic Handbag", "Designer Sunglasses", "Custom Tailored Suit", "Atelier Sewing Machine", "First Edition Perfume Bottle", "Leather Boots", "Vogue Cover Print", "Gold Watch"]
}

era_mapping = {
    "1950s": "1950s-60s",
    "1960s": "1950s-60s",
    "1970s": "1970s-80s",
    "1980s": "1970s-80s",
    "1990s": "1990s-2000s",
    "2000s": "1990s-2000s",
    "2010s": "2010s+"
}

import os

products = []
id_counter = 1

random.seed(42)
for i in range(100):
    cat = random.choice(list(people.keys()))
    person, raw_era = random.choice(people[cat])
    item = random.choice(item_templates[cat])
    
    era = era_mapping[raw_era]
    year = int(raw_era[:4]) + random.randint(0, 9)
    if era == "2010s+": year = 2010 + random.randint(0, 14)
    
    price = random.randint(10, 990) * 1000
    
    slug = f"{person.replace(' ', '-').lower()}-{item.replace(' ', '-').lower()}-{year}"
    name = f"{person}'s {item}"
    
    if os.path.exists(f"public/images/{slug}.png"):
        img = f"/images/{slug}.png"
    elif name == "Michael Jackson's Custom Sunglasses" and os.path.exists("public/images/mj_glasses.png"):
        img = "/images/mj_glasses.png"
    elif name == "Ayrton Senna's Training Shoes" and os.path.exists("public/images/senna_shoes.png"):
        img = "/images/senna_shoes.png"
    elif name == "Marlon Brando's Oscar Trophy Replica" and os.path.exists("public/images/brando_oscar.png"):
        img = "/images/brando_oscar.png"
    else:
        img = f"https://image.pollinations.ai/prompt/Cinematic%20photography%20of%20{item.replace(' ', '%20')}%20owned%20by%20{person.replace(' ', '%20')}%20dark%20museum%20lighting?width=800&height=1000&nologo=true"

    products.append({
        "id": id_counter,
        "slug": slug,
        "name": name,
        "person": person,
        "category": cat,
        "subcategory": "Collectibles",
        "era": era,
        "year": year,
        "price": price,
        "currency": "EUR",
        "description": f"An authentic, verified {item.lower()} belonging to the legendary {person}. This piece is a remarkable artifact from the {era} era, specifically dated around {year}.",
        "provenance": "Authenticated by Global Historical Appraisals",
        "images": [img],
        "certified": True,
        "featured": id_counter <= 12,
        "vault": False
    })
    id_counter += 1

vault_items = [
    {
        "id": id_counter, "slug": "paul-newman-rolex-daytona-1968", "name": "Paul Newman's Rolex Daytona",
        "person": "Paul Newman", "category": "Cinema", "subcategory": "Watches", "era": "1950s-60s", "year": 1968,
        "price": 15300000, "currency": "EUR", "description": "The iconic Rolex Cosmograph Daytona owned and worn daily by Paul Newman.",
        "provenance": "Paul Newman Estate", "images": ["/images/journal_1.png"],
        "certified": True, "featured": False, "vault": True
    },
    {
        "id": id_counter+1, "slug": "pete-townshend-shattered-les-paul-1976", "name": "Shattered Les Paul Custom",
        "person": "Pete Townshend", "category": "Music", "subcategory": "Instruments", "era": "1970s-80s", "year": 1976,
        "price": 185000, "currency": "EUR", "description": "The remnants of a Gibson Les Paul Custom famously smashed on stage by Pete Townshend.",
        "provenance": "The Who Tour Management", "images": ["/images/journal_2.png"],
        "certified": True, "featured": False, "vault": True
    },
    {
        "id": id_counter+2, "slug": "rocky-marciano-training-gloves-1952", "name": "Heavyweight Training Gloves",
        "person": "Rocky Marciano", "category": "Sports", "subcategory": "Boxing", "era": "1950s-60s", "year": 1952,
        "price": 85000, "currency": "EUR", "description": "Original leather training gloves used by the undefeated heavyweight champion Rocky Marciano.",
        "provenance": "Marciano Family Trust", "images": ["/images/journal_3.png"],
        "certified": True, "featured": False, "vault": True
    },
    {
        "id": id_counter+3, "slug": "steve-mcqueen-bomber-jacket-1963", "name": "The Great Escape Bomber Jacket",
        "person": "Steve McQueen", "category": "Cinema", "subcategory": "Fashion", "era": "1950s-60s", "year": 1963,
        "price": 320000, "currency": "EUR", "description": "Vintage military A-2 aviator jacket screen-worn by Steve McQueen.",
        "provenance": "MGM Studios Archive", "images": ["/images/journal_4.png"],
        "certified": True, "featured": False, "vault": True
    },
    {
        "id": id_counter+4, "slug": "romanov-imperial-sapphire-1890", "name": "The Romanov Imperial Sapphire",
        "person": "Russian Royal Family", "category": "Royalty", "subcategory": "Jewellery", "era": "1950s-60s", "year": 1890,
        "price": 24000000, "currency": "EUR", "description": "A flawless 64-carat Kashmir sapphire necklace smuggled out of St. Petersburg in 1917.",
        "provenance": "Private Swiss Vault", "images": ["/images/royal_archives.png"],
        "certified": True, "featured": False, "vault": True
    }
]

vault_data = [
    ("Gutenberg Bible Page", "Johannes Gutenberg", 1455, 300000, "vault_bible.png", "A pristine, verified original page from the first major printed book."),
    ("Apollo 11 Control Stick", "Neil Armstrong", 1969, 5000000, "vault_apollo.png", "The actual translational hand controller used to pilot the Lunar Module Eagle."),
    ("Da Vinci Sketchbook Leaf", "Leonardo Da Vinci", 1508, 12000000, "vault_davinci.png", "A newly discovered double-sided page from Da Vinci's notebook."),
    ("Marie Antoinette's Diamond", "Marie Antoinette", 1785, 8000000, "vault_antoinette.png", "A stunning 14-carat pink diamond from the Queen's personal collection."),
    ("Einstein's E=mc2 Manuscript", "Albert Einstein", 1905, 15000000, "vault_einstein.png", "One of only three known original manuscripts written in Einstein's own hand."),
    ("Charlemagne's Dagger", "Charlemagne", 800, 4500000, "vault_dagger.png", "An ornate ceremonial dagger attributed to the first Holy Roman Emperor."),
    ("Magna Carta Original Copy", "King John", 1215, 20000000, "editorial_2.png", "One of the surviving 13th-century copies of the Magna Carta."),
    ("Eid Mar Gold Coin", "Brutus", 42, 3500000, "vault_coin.png", "An ultra-rare gold Aureus minted by Brutus to commemorate Caesar's assassination."),
    ("Mozart's Requiem Score", "Wolfgang Amadeus Mozart", 1791, 18000000, "vault_mozart.png", "The final 3 pages of the Lacrimosa, written in Mozart's own hand."),
    ("Apple-1 Prototype Board", "Steve Jobs & Wozniak", 1976, 2500000, "vault_apple1.png", "Hand-soldered by Steve Wozniak, the prototype board of the Apple-1.")
]

for i, v in enumerate(vault_data):
    vault_items.append({
        "id": id_counter + 5 + i,
        "slug": v[0].replace(' ', '-').lower() + f"-{v[2]}",
        "name": v[0],
        "person": v[1],
        "category": "Historical",
        "subcategory": "Artifacts",
        "era": "1950s-60s",
        "year": v[2],
        "price": v[3],
        "currency": "EUR",
        "description": v[5],
        "provenance": "ICONIC Vault Secure Acquisition",
        "images": [f"/images/{v[4]}"],
        "certified": True,
        "featured": False,
        "vault": True
    })

custom_items = [
    {
        "id": 116, "slug": "freddie-mercury-stage-microphone-1986", "name": "Stage Microphone",
        "person": "Freddie Mercury", "category": "Music", "subcategory": "Artifacts", "era": "1970s-80s", "year": 1986,
        "price": 120000, "currency": "EUR", "description": "An authentic, verified stage microphone belonging to the legendary Freddie Mercury. This piece is a remarkable artifact from the 1980s era, specifically dated around 1986.",
        "provenance": "Christie's Auction / Private Collection", "images": ["/images/freddie-mercury-stage-microphone-1986.png"],
        "certified": True, "featured": False, "vault": False
    },
    {
        "id": 117, "slug": "marilyn-monroe-vanity-mirror-1955", "name": "Vanity Mirror",
        "person": "Marilyn Monroe", "category": "Cinema", "subcategory": "Artifacts", "era": "1950s-60s", "year": 1955,
        "price": 85000, "currency": "EUR", "description": "An authentic, verified vanity mirror belonging to the legendary Marilyn Monroe. This piece is a remarkable artifact from the 1950s era, specifically dated around 1955.",
        "provenance": "Christie's Auction / Private Collection", "images": ["/images/marilyn-monroe-vanity-mirror-1955.png"],
        "certified": True, "featured": False, "vault": False
    },
    {
        "id": 118, "slug": "steve-mcqueen-racing-gloves-1971", "name": "Racing Gloves",
        "person": "Steve McQueen", "category": "Cinema", "subcategory": "Apparel", "era": "1970s-80s", "year": 1971,
        "price": 95000, "currency": "EUR", "description": "An authentic, verified racing gloves belonging to the legendary Steve McQueen. This piece is a remarkable artifact from the 1970s era, specifically dated around 1971.",
        "provenance": "Christie's Auction / Private Collection", "images": ["/images/steve-mcqueen-racing-gloves-1971.png"],
        "certified": True, "featured": False, "vault": False
    },
    {
        "id": 119, "slug": "audrey-hepburn-pearl-necklace-1961", "name": "Pearl Necklace",
        "person": "Audrey Hepburn", "category": "Cinema", "subcategory": "Jewelry", "era": "1950s-60s", "year": 1961,
        "price": 320000, "currency": "EUR", "description": "An authentic, verified pearl necklace belonging to the legendary Audrey Hepburn. This piece is a remarkable artifact from the 1960s era, specifically dated around 1961.",
        "provenance": "Christie's Auction / Private Collection", "images": ["/images/audrey-hepburn-pearl-necklace-1961.png"],
        "certified": True, "featured": False, "vault": False
    },
    {
        "id": 120, "slug": "kurt-cobain-flannel-shirt-1993", "name": "Flannel Shirt",
        "person": "Kurt Cobain", "category": "Music", "subcategory": "Apparel", "era": "1990s-2000s", "year": 1993,
        "price": 180000, "currency": "EUR", "description": "An authentic, verified flannel shirt belonging to the legendary Kurt Cobain. This piece is a remarkable artifact from the 1990s era, specifically dated around 1993.",
        "provenance": "Christie's Auction / Private Collection", "images": ["/images/kurt-cobain-flannel-shirt-1993.png"],
        "certified": True, "featured": False, "vault": False
    },
    {
        "id": 121, "slug": "princess-diana-sapphire-ring-1981", "name": "Sapphire Ring",
        "person": "Princess Diana", "category": "Royalty", "subcategory": "Jewelry", "era": "1970s-80s", "year": 1981,
        "price": 450000, "currency": "EUR", "description": "An authentic, verified sapphire ring belonging to Princess Diana. This piece is a remarkable artifact from the 1980s era, specifically dated around 1981.",
        "provenance": "Royal Archives / Private Collection", "images": ["/images/princess-diana-sapphire-ring-1981.png"],
        "certified": True, "featured": False, "vault": False
    },
    {
        "id": 122, "slug": "david-bowie-lightning-bolt-jacket-1973", "name": "Lightning Bolt Jacket",
        "person": "David Bowie", "category": "Music", "subcategory": "Apparel", "era": "1970s-80s", "year": 1973,
        "price": 280000, "currency": "EUR", "description": "An authentic, verified lightning bolt jacket belonging to the legendary David Bowie. This piece is a remarkable artifact from the 1970s era, specifically dated around 1973.",
        "provenance": "Christie's Auction / Private Collection", "images": ["/images/david-bowie-lightning-bolt-jacket-1973.png"],
        "certified": True, "featured": False, "vault": False
    },
    {
        "id": 123, "slug": "muhammad-ali-boxing-robe-1974", "name": "Boxing Robe",
        "person": "Muhammad Ali", "category": "Sports", "subcategory": "Apparel", "era": "1970s-80s", "year": 1974,
        "price": 310000, "currency": "EUR", "description": "An authentic, verified boxing robe belonging to the legendary Muhammad Ali. This piece is a remarkable artifact from the 1970s era, specifically dated around 1974.",
        "provenance": "Private Collection", "images": ["/images/muhammad-ali-boxing-robe-1974.png"],
        "certified": True, "featured": False, "vault": False
    },
    {
        "id": 124, "slug": "jackie-kennedy-pillbox-hat-1961", "name": "Pillbox Hat",
        "person": "Jackie Kennedy", "category": "Politics", "subcategory": "Apparel", "era": "1950s-60s", "year": 1961,
        "price": 190000, "currency": "EUR", "description": "An authentic, verified pillbox hat belonging to Jackie Kennedy. This piece is a remarkable artifact from the 1960s era, specifically dated around 1961.",
        "provenance": "Private Collection", "images": ["/images/jackie-kennedy-pillbox-hat-1961.png"],
        "certified": True, "featured": False, "vault": False
    },
    {
        "id": 125, "slug": "jimi-hendrix-psychedelic-guitar-strap-1969", "name": "Psychedelic Guitar Strap",
        "person": "Jimi Hendrix", "category": "Music", "subcategory": "Artifacts", "era": "1950s-60s", "year": 1969,
        "price": 140000, "currency": "EUR", "description": "An authentic, verified psychedelic guitar strap belonging to the legendary Jimi Hendrix. This piece is a remarkable artifact from the 1960s era, specifically dated around 1969.",
        "provenance": "Private Collection", "images": ["/images/jimi-hendrix-psychedelic-guitar-strap-1969.png"],
        "certified": True, "featured": False, "vault": False
    },
    {
        "id": 126, "slug": "elton-john-rhinestone-glasses-1974", "name": "Rhinestone Glasses",
        "person": "Elton John", "category": "Music", "subcategory": "Accessories", "era": "1970s-80s", "year": 1974,
        "price": 220000, "currency": "EUR", "description": "An authentic, verified pair of rhinestone glasses belonging to the legendary Elton John. This piece is a remarkable artifact from the 1970s era, specifically dated around 1974.",
        "provenance": "Private Collection", "images": ["/images/elton-john-rhinestone-glasses-1974.png"],
        "certified": True, "featured": False, "vault": False
    },
    {
        "id": 127, "slug": "bruce-lee-martial-arts-nunchaku-1972", "name": "Martial Arts Nunchaku",
        "person": "Bruce Lee", "category": "Cinema", "subcategory": "Artifacts", "era": "1970s-80s", "year": 1972,
        "price": 450000, "currency": "EUR", "description": "An authentic, verified martial arts nunchaku belonging to the legendary Bruce Lee. This piece is a remarkable artifact from the 1970s era, specifically dated around 1972.",
        "provenance": "Private Collection", "images": ["/images/bruce-lee-martial-arts-nunchaku-1972.png"],
        "certified": True, "featured": False, "vault": False
    },
    {
        "id": 128, "slug": "frank-ocean-cassette-tape-2012", "name": "Cassette Tape",
        "person": "Frank Ocean", "category": "Music", "subcategory": "Artifacts", "era": "2010s+", "year": 2012,
        "price": 55000, "currency": "EUR", "description": "An authentic, verified cassette tape belonging to the legendary Frank Ocean. This piece is a remarkable artifact from the 2010s era, specifically dated around 2012.",
        "provenance": "Private Collection", "images": ["/images/frank-ocean-cassette-tape-2012.png"],
        "certified": True, "featured": False, "vault": False
    },
    {
        "id": 129, "slug": "michael-jackson-sequined-glove-1983", "name": "Sequined Glove",
        "person": "Michael Jackson", "category": "Music", "subcategory": "Apparel", "era": "1970s-80s", "year": 1983,
        "price": 350000, "currency": "EUR", "description": "An authentic, verified sequined glove belonging to the legendary Michael Jackson. This piece is a remarkable artifact from the 1980s era, specifically dated around 1983.",
        "provenance": "Private Collection", "images": ["/images/michael-jackson-sequined-glove-1983.png"],
        "certified": True, "featured": False, "vault": False
    },
    {
        "id": 130, "slug": "prince-purple-velvet-coat-1984", "name": "Purple Velvet Coat",
        "person": "Prince", "category": "Music", "subcategory": "Apparel", "era": "1970s-80s", "year": 1984,
        "price": 420000, "currency": "EUR", "description": "An authentic, verified purple velvet coat belonging to the legendary Prince. This piece is a remarkable artifact from the 1980s era, specifically dated around 1984.",
        "provenance": "Private Collection", "images": ["/images/prince-purple-velvet-coat-1984.png"],
        "certified": True, "featured": False, "vault": False
    }
]

all_normal_products = products + custom_items
real_photo_products = [p for p in all_normal_products if "pollinations.ai" not in p["images"][0]]

random.seed(123)
if len(real_photo_products) > 35:
    chosen_products = random.sample(real_photo_products, 35)
else:
    chosen_products = real_photo_products

all_products = chosen_products + vault_items

js_code = "export const products = " + json.dumps(all_products, indent=2) + ";\n"
with open("data/products.js", "w") as f:
    f.write(js_code)
