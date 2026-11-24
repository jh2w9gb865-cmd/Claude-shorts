#!/usr/bin/env python3
"""Writes cartoon/src/songs/<slug>.json for the batch of songs (lyrics, cast, scenes, YouTube metadata).

Standard song form (about 2:06): intro 8s, verse, chorus, verse, chorus, verse/bridge, chorus, chorus, outro 6s.
Each verse/chorus is 16 s = 8 bars at 120 BPM, 4 lines of 4 s each.
"""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "cartoon", "src", "songs")

R, O, Y, G, B, P, K, BR = "#ff3b3b", "#ff8a1f", "#ffc300", "#3ec43e", "#2fa8ff", "#8e5bff", "#ff4f9a", "#b9773a"


def w(word, color):
    return {"word": word, "color": color}


COMMON_TAGS = ["kids songs", "songs for kids", "nursery rhymes", "toddler songs", "preschool songs", "kindergarten songs", "sing along songs for kids", "children's songs", "sunny sprouts"]


def song(slug, id, scene, title_p, title_l, cast, verses, chorus, meta, *, sky="day", mood="party", styles=(), outro=None, outro_text="HOORAY!", bridge=None):
    secs = [{"kind": "intro", "ms": 8000}]
    v = [{"kind": "verse", "ms": 16000, "lines": x["lines"], **({"focus": x["focus"]} if "focus" in x else {}), **({"words": x["words"]} if "words" in x else {}), **({"weather": x["weather"]} if "weather" in x else {})} for x in verses]
    ch = {"kind": "chorus", "ms": 16000, "lines": chorus}
    secs += [v[0], dict(ch), v[1], dict(ch)]
    if bridge:
        secs.append({"kind": "bridge", "ms": 16000, "lines": bridge["lines"], **({k: bridge[k] for k in ("focus", "words", "weather") if k in bridge})})
    secs += [v[2], dict(ch), dict(ch)]
    if mood != "calm":
        secs.append({"kind": "outro", "ms": 6000, "lines": [outro or "Hooray!"]})
    tags = meta["tags"] + [t for t in COMMON_TAGS if t not in meta["tags"]]
    spec = {
        "slug": slug,
        "id": id,
        "audio": f"audio/{slug}.mp3",
        "durationFrames": sum(round(s["ms"] / 1000 * 30) for s in secs),
        "scene": scene,
        "sky": sky,
        "mood": mood,
        "styles": list(styles),
        "title": {"portrait": title_p, "landscape": title_l},
        "outroText": outro_text,
        "cast": [{"kind": k, "name": n, "emoji": e, "about": a} for k, n, e, a in cast],
        "sections": secs,
        "meta": {**meta, "tags": tags[:20]},
    }
    with open(os.path.join(OUT, f"{slug}.json"), "w") as fh:
        json.dump(spec, fh, indent=2, ensure_ascii=False)
        fh.write("\n")
    return slug


SONGS = []

SONGS.append(song(
    "snowman-dance", "SnowmanDance", "snow", ["Snowman", "Dance!"], ["Snowman Dance!"],
    [("penguin", "Pippa Penguin", "🐧", "flaps her flippers to the beat"),
     ("snowman", "Sammy Snowman", "⛄", "a jolly snowman who loves to dance"),
     ("bunny", "Bella Bunny", "🐰", "the best hopper in the snow"),
     ("polarbear", "Polo Polar Bear", "🐻‍❄️", "big, fluffy and great at spinning")],
    [{"focus": [1], "lines": ["I'm a snowman, round and white,", "with a carrot nose so bright.", "When the music starts to play,", "I can dance the snowy way!"]},
     {"focus": [0, 2], "lines": ["Penguin flaps and Bunny hops,", "spinning round like spinning tops.", "Clap your hands and touch your nose,", "wiggle all your frosty toes!"],
      "words": [w("FLAP", B), w("HOP", K), w("CLAP", Y), w("TOES", P)]},
     {"focus": [3, 1], "lines": ["Nod your head and touch the ground,", "jump up high and spin around!", "Snowflakes falling, one, two, three,", "come and dance the snow with me!"],
      "words": [w("NOD", O), w("JUMP", G), w("1, 2, 3!", B), None]}],
    ["Shake, shake, shake your arms,", "stomp, stomp, stomp your feet,", "wiggle, wiggle, turn around,", "dance the snowman beat!"],
    {"song": "Snowman Dance", "shortTitle": "Snowman Dance ⛄ Shake, Stomp & Wiggle!",
     "longTitle": "Snowman Dance ⛄ Winter Dance Song for Kids | Move & Learn Body Parts | Sunny Sprouts",
     "hook": "⛄ Shake your arms, stomp your feet and dance with Sammy Snowman!",
     "about": "A bouncy winter action song for little ones. Sammy Snowman, Pippa Penguin, Bella Bunny and Polo Polar Bear show kids how to shake, stomp, wiggle, clap and spin. Perfect for a winter dance break!",
     "learn": ["body parts: arms, feet, head, nose and toes", "action words: shake, stomp, clap, jump and spin", "counting to three", "moving to the beat"],
     "tags": ["snowman song", "snowman dance", "winter songs for kids", "christmas songs for kids", "dance songs for kids", "action songs for kids", "movement songs for toddlers", "body parts song", "brain break for kids", "freeze dance kids"],
     "hashtags": ["#wintersongs", "#kidssongs", "#dancesongs", "#snowman"], "playlist": "Christmas Songs for Kids"},
    styles=["sleigh bells and bouncy bass", "winter dance pop"], outro="Yay, snow!", outro_text="YAY!"))

SONGS.append(song(
    "santa-helpers", "SantaHelpers", "snow", ["Santa's Little", "Helpers!"], ["Santa's Little Helpers!"],
    [("elfgreen", "Elfie", "🧝", "wraps presents faster than anyone"),
     ("santa", "Santa", "🎅", "jolly, kind and always smiling"),
     ("reindeer", "Rudy Reindeer", "🦌", "ready to pull the sleigh"),
     ("elfred", "Jingles", "🧝", "ties the prettiest bows"),
     ("gingerbread", "Ginger", "🍪", "the sweetest helper in the workshop")],
    [{"focus": [0, 3], "lines": ["In the workshop, tap, tap, tap,", "elves are busy, wrap, wrap, wrap!", "Paper, ribbon, bows on top,", "Santa's helpers never stop!"],
      "words": [w("TAP", O), w("WRAP", R), w("BOWS", K), None]},
     {"focus": [2, 4], "lines": ["Reindeer stretch and stand in line,", "Gingerbread says, 'Looking fine!'", "Load the sleigh up, one, two, three,", "gifts for you and gifts for me!"],
      "words": [None, None, w("1, 2, 3!", G), w("GIFTS", R)]},
     {"focus": [1], "lines": ["Santa smiles and waves goodbye,", "watch the sleigh fly through the sky!", "Be kind and share, and you will see,", "the best gift is you and me!"],
      "words": [None, None, w("SHARE", K), None]}],
    ["Ho, ho, ho, here we go,", "Santa's helpers in the snow!", "Wrap a present, make a toy,", "share the love and share the joy!"],
    {"song": "Santa's Little Helpers", "shortTitle": "Santa's Little Helpers 🎅 Ho Ho Ho, Here We Go!",
     "longTitle": "Santa's Little Helpers 🎅 Christmas Song for Kids | Elves, Reindeer & Santa | Sunny Sprouts",
     "hook": "🎅 Ho, ho, ho! Let's help Santa wrap the presents and load the sleigh!",
     "about": "A cheerful Christmas song about teamwork and kindness. Santa's elves tap, wrap and tie bows, Rudy Reindeer gets ready, and everyone learns that sharing is the best gift of all.",
     "learn": ["Christmas words: workshop, sleigh, present, ribbon", "counting to three", "teamwork and helping", "kindness and sharing"],
     "tags": ["santa song for kids", "christmas songs for kids", "santa claus song", "elves song", "reindeer song", "christmas songs for toddlers", "kids christmas music", "christmas cartoon for kids", "ho ho ho song", "holiday songs for kids"],
     "hashtags": ["#christmassongs", "#santaclaus", "#kidssongs", "#christmas"], "playlist": "Christmas Songs for Kids"},
    styles=["sleigh bells and glockenspiel", "festive Christmas pop"], outro="Ho, ho, ho!", outro_text="HO HO HO!"))

SONGS.append(song(
    "brush-teeth", "BrushTeeth", "bathroom", ["Brush Brush", "Your Teeth!"], ["Brush Brush Brush Your Teeth!"],
    [("toothbrush", "Bristle", "🪥", "a speedy little toothbrush"),
     ("tooth", "Toothy", "🦷", "a happy tooth who loves to sparkle"),
     ("toothpaste", "Minty", "🧴", "a minty fresh toothpaste tube"),
     ("bunny", "Bella Bunny", "🐰", "has the brightest smile in town")],
    [{"focus": [1], "lines": ["Wake up, teeth, it's time to shine,", "let's brush them clean, they'll look so fine!", "A little toothpaste, pea-size dot,", "brush the front and back a lot!"],
      "words": [None, None, w("PEA SIZE", B), w("FRONT & BACK", G)]},
     {"focus": [0, 2], "lines": ["Brush the top and brush the bottom,", "tiny bubbles, now you've got 'em!", "Little circles, round and round,", "brushy, brushy, hear that sound?"],
      "words": [w("TOP", R), w("BUBBLES", B), w("CIRCLES", G), None]},
     {"focus": [3, 1], "lines": ["Don't forget your tongue so pink,", "swish and spit into the sink!", "Two whole minutes, then we're done,", "brushing teeth is so much fun!"],
      "words": [w("TONGUE", K), w("SPIT", B), w("2 MINUTES", P), None]}],
    ["Brush, brush, brush your teeth,", "top and bottom, round and round!", "Brush, brush, brush your teeth,", "sparkly smiles all around!"],
    {"song": "Brush Brush Brush Your Teeth", "shortTitle": "Brush Your Teeth Song 🦷 2 Minute Brushing Fun!",
     "longTitle": "Brush Brush Brush Your Teeth 🦷 Tooth Brushing Song for Kids | Healthy Habits | Sunny Sprouts",
     "hook": "🦷 Make tooth brushing fun! Sing along with Toothy, Bristle and Minty while you brush.",
     "about": "A happy tooth brushing song for toddlers and preschoolers. Toothy the Tooth, Bristle the Toothbrush and Minty the Toothpaste show kids how to brush the top and bottom, make little circles, clean the tongue and spit, for a sparkly smile every day!",
     "learn": ["how to brush teeth step by step", "a pea-size dot of toothpaste", "brushing in little circles, top and bottom", "brushing your tongue and spitting into the sink"],
     "tags": ["brush your teeth song", "tooth brushing song", "brushing teeth for kids", "toothbrush song", "healthy habits for kids", "brush teeth 2 minutes", "dental song for kids", "kids routine songs", "morning routine song", "bedtime routine song"],
     "hashtags": ["#brushyourteeth", "#healthyhabits", "#kidssongs", "#toothbrushing"], "playlist": "Healthy Habits Songs"},
    styles=["bubbly marimba", "playful toy piano"], outro="Sparkly smile!", outro_text="SMILE!"))

SONGS.append(song(
    "wash-hands", "WashHands", "bathroom", ["Wash Wash", "Your Hands!"], ["Wash Wash Wash Your Hands!"],
    [("soap", "Sudsy Soap", "🧼", "makes the biggest, foamiest bubbles"),
     ("bubble", "Bubbles", "🫧", "a shiny bubble who floats around"),
     ("germ", "Grubby the Germ", "🦠", "a silly little germ who doesn't like soap"),
     ("bunny", "Bella Bunny", "🐰", "always washes her paws")],
    [{"focus": [0], "lines": ["Turn the water on, drip, drop,", "squeeze the soap, pump, pump, pop!", "Rub your hands and make it foam,", "bubbles, bubbles, all your own!"],
      "words": [w("WATER", B), w("SOAP", K), w("RUB", Y), w("BUBBLES", P)]},
     {"focus": [1, 3], "lines": ["Palms together, rub, rub, rub,", "backs and fingers, scrub, scrub, scrub!", "Don't forget your thumbs and nails,", "wiggle, wiggle, bubble trails!"],
      "words": [w("PALMS", O), w("FINGERS", G), w("THUMBS", R), None]},
     {"focus": [2, 0], "lines": ["Little germs say, 'Oh, oh, no!'", "Time for all the germs to go!", "Rinse them off and shake, shake, shake,", "dry them with a towel, no mistake!"],
      "words": [None, w("BYE, GERMS!", G), w("RINSE", B), w("DRY", O)]}],
    ["Wash, wash, wash your hands,", "scrub them clean today!", "Wash, wash, wash your hands,", "wash the germs away!"],
    {"song": "Wash Wash Wash Your Hands", "shortTitle": "Wash Your Hands Song 🧼 Bye Bye Germs!",
     "longTitle": "Wash Wash Wash Your Hands 🧼 Handwashing Song for Kids | Healthy Habits | Sunny Sprouts",
     "hook": "🧼 Scrub-a-dub! Learn to wash your hands the fun way with Sudsy Soap and Bubbles!",
     "about": "A catchy handwashing song for toddlers and preschoolers. Sudsy Soap and Bubbles show every step: water, soap, rub palms, backs, fingers, thumbs and nails, rinse and dry, and silly Grubby the Germ has to go away!",
     "learn": ["the steps of washing hands", "palms, fingers, thumbs and nails", "why we wash away germs", "rinsing and drying hands"],
     "tags": ["wash your hands song", "handwashing song for kids", "wash hands kids", "germs song for kids", "healthy habits for kids", "hygiene song for kids", "soap song", "kids routine songs", "bathroom songs for kids", "clean hands song"],
     "hashtags": ["#washyourhands", "#healthyhabits", "#kidssongs", "#handwashing"], "playlist": "Healthy Habits Songs"},
    styles=["bubbly synth and marimba", "playful bounce"], outro="Clean hands!", outro_text="CLEAN!"))

SONGS.append(song(
    "bath-time", "BathTime", "bathroom", ["Bath Time", "Bubbles!"], ["Bath Time Bubbles!"],
    [("duck", "Ducky", "🦆", "a squeaky rubber duck"),
     ("bubble", "Bubbles", "🫧", "floats higher than everyone"),
     ("boat", "Toot Toot Boat", "⛵", "a little toy boat that loves to sail"),
     ("frog", "Freddie Frog", "🐸", "jumps in with the biggest splash")],
    [{"focus": [0], "lines": ["Splish, splash, into the tub,", "it's time for a rub-a-dub-dub!", "Rubber Duck says, 'Quack, quack, quack!'", "floating to the front and back!"],
      "words": [w("SPLASH", B), None, w("QUACK!", Y), None]},
     {"focus": [2, 3], "lines": ["Toy boat sailing, toot, toot, toot,", "Froggy jumps in, what a hoot!", "Wash your tummy, wash your toes,", "wash your ears and wash your nose!"],
      "words": [w("TOOT!", R), w("JUMP", G), w("TUMMY", K), w("NOSE", O)]},
     {"focus": [1], "lines": ["Shampoo bubbles on my head,", "rinse it off, it's nearly bed!", "Wrap up in a towel so snug,", "time for one big bath-time hug!"],
      "words": [w("SHAMPOO", P), w("RINSE", B), w("TOWEL", O), w("HUG", K)]}],
    ["Bubbles, bubbles, pop, pop, pop,", "bath time fun, we'll never stop!", "Bubbles, bubbles, float up high,", "wave the bubbles bye-bye-bye!"],
    {"song": "Bath Time Bubbles", "shortTitle": "Bath Time Bubbles 🛁 Splish Splash Song!",
     "longTitle": "Bath Time Bubbles 🛁 Bath Song for Kids | Splish Splash Rubber Duck | Sunny Sprouts",
     "hook": "🛁 Splish, splash! It's bath time with Ducky, Bubbles, Toot Toot Boat and Freddie Frog!",
     "about": "A bubbly bath time song that turns washing into play. Kids wash their tummy, toes, ears and nose, rinse the shampoo bubbles and wrap up in a cozy towel, ready for bed.",
     "learn": ["body parts: tummy, toes, ears, nose", "bath time routine", "bubbles, shampoo and towel", "getting ready for bed"],
     "tags": ["bath song for kids", "bath time song", "rubber duck song", "bubbles song", "bath time for toddlers", "kids routine songs", "bedtime routine song", "splish splash song", "healthy habits for kids", "bath toys song"],
     "hashtags": ["#bathtime", "#kidssongs", "#rubberduck", "#healthyhabits"], "playlist": "Healthy Habits Songs"},
    styles=["bubbly ukulele and glockenspiel"], outro="Squeaky clean!", outro_text="CLEAN!"))

SONGS.append(song(
    "goodnight-stars", "GoodnightStars", "night", ["Goodnight,", "Sleepy Stars"], ["Goodnight, Sleepy Stars"],
    [("bunny", "Bella Bunny", "🐰", "snuggles into her cozy bed"),
     ("star", "Twinkle Star", "⭐", "the sleepiest little star in the sky"),
     ("bear", "Teddy Bear", "🧸", "loves a goodnight hug"),
     ("chick", "Pip the Chick", "🐥", "says the softest 'peep, goodnight'")],
    [{"focus": [1], "lines": ["The moon is up, the sky is blue,", "the little stars are sleepy too.", "Yawn, yawn, stretch so tall,", "it's time to rest, goodnight to all."],
      "words": [w("MOON", Y), None, w("YAWN", P), None]},
     {"focus": [0, 2], "lines": ["Bunny hops into her bed,", "Teddy lays his sleepy head.", "Pajamas on and teeth all clean,", "the coziest you've ever seen."],
      "words": [w("BED", K), None, w("PAJAMAS", B), None]},
     {"focus": [3, 1], "lines": ["Little Chick says, 'Peep, goodnight,'", "Mommy gives a hug so tight.", "Fluffy pillow, blanket warm,", "safe and sound until the morn."],
      "words": [None, w("HUG", K), w("PILLOW", P), None]}],
    ["Goodnight, sleepy stars,", "twinkle soft and slow,", "close your little eyes,", "dream and grow, grow, grow."],
    {"song": "Goodnight, Sleepy Stars", "shortTitle": "Goodnight Sleepy Stars 🌙 Bedtime Lullaby",
     "longTitle": "Goodnight, Sleepy Stars 🌙 Bedtime Lullaby for Babies & Toddlers | Sunny Sprouts",
     "hook": "🌙 A soft, gentle lullaby to help little ones wind down and drift off to sleep.",
     "about": "A calm bedtime song with Twinkle Star, Bella Bunny, Teddy Bear and Pip the Chick. Pajamas on, teeth all clean, a big hug and a fluffy pillow: time to say goodnight.",
     "learn": ["a calm bedtime routine", "bedtime words: moon, stars, pillow, pajamas", "winding down before sleep", "saying goodnight"],
     "tags": ["lullaby for babies", "bedtime songs for kids", "goodnight song", "sleep music for kids", "lullaby for toddlers", "bedtime lullaby", "baby sleep song", "calm songs for kids", "night time song", "twinkle stars lullaby"],
     "hashtags": ["#lullaby", "#bedtime", "#babysleep", "#goodnight"], "playlist": "Bedtime Lullabies", "ages": "0–5"},
    sky="day", mood="calm"))

SONGS.append(song(
    "clean-up", "CleanUp", "playroom", ["Clean Up", "Song!"], ["Clean Up, Clean Up Song!"],
    [("bear", "Teddy Bear", "🧸", "always first to help"),
     ("ball", "Bouncy Ball", "⚽", "bounces back to the shelf"),
     ("block", "Blocky", "🧱", "a toy block who loves a tidy box"),
     ("bunny", "Bella Bunny", "🐰", "puts the books back in a row")],
    [{"focus": [1], "lines": ["Toys are here and toys are there,", "toys are scattered everywhere!", "Let's all help and play a game,", "every toy goes home again!"],
      "words": [None, None, w("GAME", Y), w("HOME", G)]},
     {"focus": [2, 0], "lines": ["Blocks go in the big red bin,", "Teddy waves and jumps right in!", "Balls go bouncing to the shelf,", "look, I did it by myself!"],
      "words": [w("BLOCKS", R), w("TEDDY", BR), w("BALL", B), None]},
     {"focus": [3, 1], "lines": ["Books stand up all in a row,", "crayons back in the box they go!", "Look around, it's nice and neat,", "clean-up time is such a treat!"],
      "words": [w("BOOKS", P), w("CRAYONS", O), w("NEAT", G), None]}],
    ["Clean up, clean up, everybody help,", "put the toys back on the shelf!", "Clean up, clean up, one, two, three,", "a tidy room for you and me!"],
    {"song": "Clean Up Song", "shortTitle": "Clean Up Song 🧸 Tidy Up Time for Kids!",
     "longTitle": "Clean Up Song 🧸 Tidy Up Song for Kids | Toddler Routine | Sunny Sprouts",
     "hook": "🧸 Clean up, clean up, everybody help! Make tidy-up time a fun game.",
     "about": "A happy tidy-up song for home, daycare and preschool. Teddy Bear, Bouncy Ball, Blocky and Bella Bunny put the blocks in the bin, the balls on the shelf and the books in a row until the room is nice and neat.",
     "learn": ["tidying up after playing", "where toys belong", "helping and teamwork", "counting to three"],
     "tags": ["clean up song", "clean up song for kids", "tidy up song", "toddler routine songs", "preschool transition songs", "cleaning song for kids", "helping song", "classroom songs", "daycare songs", "toys song"],
     "hashtags": ["#cleanupsong", "#kidssongs", "#toddlerlife", "#preschool"], "playlist": "Healthy Habits Songs"},
    styles=["bouncy ukulele and claps"], outro="All clean!", outro_text="DONE!"))

SONGS.append(song(
    "count-to-ten", "CountToTen", "meadow", ["Count to 10", "with Froggy!"], ["Count to 10 with Froggy!"],
    [("ladybug", "Lily Ladybug", "🐞", "small, red and full of spots"),
     ("chick", "Pip the Chick", "🐥", "peeps every number"),
     ("frog", "Freddie Frog", "🐸", "jumps once for every number"),
     ("bluebird", "Bobby Bluebird", "🐦", "counts from up in the tree"),
     ("fox", "Finn Fox", "🦊", "counts with his fluffy tail")],
    [{"focus": [2], "lines": ["One, two, Froggy says, 'Hello to you!'", "Three, four, hop across the floor!", "Five, six, jumping tricks!", "Seven, eight, Froggy's feeling great!"],
      "words": [w("1, 2", R), w("3, 4", O), w("5, 6", Y), w("7, 8", G)]},
     {"focus": [0, 1, 3], "lines": ["One little ladybug, red and small,", "two little chicks that peep and call,", "three bluebirds singing in a tree,", "four little foxes, count with me!"],
      "words": [w("1", R), w("2", Y), w("3", B), w("4", O)]},
     {"focus": [2, 4], "lines": ["Five, six, seven, jump in line,", "eight and nine, we're doing fine!", "And the last one, here we go,", "TEN! The biggest jump, you know!"],
      "words": [w("5, 6, 7", P), w("8, 9", K), None, w("10!", G)]}],
    ["Count with me from one to ten,", "jump and count it once again!", "One, two, three, four, five,", "six, seven, eight, nine, TEN!"],
    {"song": "Count to 10 with Froggy", "shortTitle": "Count to 10 with Froggy 🐸 Numbers Song!",
     "longTitle": "Count to 10 with Froggy 🐸 Numbers Song for Kids | Learn to Count 1-10 | Sunny Sprouts",
     "hook": "🐸 Jump and count with Freddie Frog! One, two, three... all the way to TEN!",
     "about": "A jumpy counting song that helps toddlers and preschoolers learn numbers 1 to 10. Freddie Frog jumps for every number, and his friends Lily Ladybug, Pip the Chick, Bobby Bluebird and Finn Fox count along.",
     "learn": ["counting from 1 to 10", "number words in English", "counting objects: 1 ladybug, 2 chicks, 3 birds, 4 foxes", "jumping and moving while counting"],
     "tags": ["counting song", "numbers song", "count to 10", "123 song", "learn to count", "numbers for kids", "counting for toddlers", "math songs for kids", "number song 1 to 10", "frog song for kids"],
     "hashtags": ["#countingsong", "#numberssong", "#kidssongs", "#learntocount"], "playlist": "Learning Songs"},
    styles=["bouncy xylophone"], outro="We counted to ten!", outro_text="TEN!"))

SONGS.append(song(
    "shapes", "Shapes", "meadow", ["Shapes All", "Around!"], ["Shapes All Around!"],
    [("circle", "Cici Circle", "🔴", "round like a ball"),
     ("square", "Sid Square", "🟦", "has four sides and four corners"),
     ("triangle", "Tina Triangle", "🔺", "has three sides, like a slice of pizza"),
     ("star", "Twinkle Star", "⭐", "has five points that shine"),
     ("heart", "Hattie Heart", "💗", "full of love")],
    [{"focus": [0, 1], "lines": ["I'm a circle, round and round,", "like a ball that's on the ground!", "I'm a square with sides of four,", "like a window or a door!"],
      "words": [w("CIRCLE", R), None, w("SQUARE", B), None]},
     {"focus": [2, 3], "lines": ["I'm a triangle, one, two, three,", "like a slice of pizza, see?", "I'm a star up in the night,", "five points shining, oh so bright!"],
      "words": [w("TRIANGLE", G), None, w("STAR", Y), None]},
     {"focus": [4], "lines": ["I'm a heart, I'm full of love,", "like a hug from up above!", "Circle, square, triangle, star,", "shapes are everywhere you are!"],
      "words": [w("HEART", K), None, None, None]}],
    ["Shapes, shapes, all around,", "look up high and look down low!", "Shapes, shapes, can be found", "everywhere that you go!"],
    {"song": "Shapes All Around", "shortTitle": "Shapes Song 🔺 Circle, Square, Triangle, Star!",
     "longTitle": "Shapes All Around 🔺 Shapes Song for Kids | Learn Circle, Square, Triangle, Star & Heart | Sunny Sprouts",
     "hook": "🔺 Circle, square, triangle, star and heart! Let's find shapes all around us.",
     "about": "A fun shapes song for toddlers and preschoolers. Cici Circle, Sid Square, Tina Triangle, Twinkle Star and Hattie Heart introduce themselves and show where you can find each shape: a ball, a door, a slice of pizza and the night sky.",
     "learn": ["5 shapes: circle, square, triangle, star, heart", "counting sides: 3 and 4", "finding shapes in everyday things", "shape words in English"],
     "tags": ["shapes song", "shapes for kids", "learn shapes", "shapes song for toddlers", "circle square triangle", "2d shapes song", "preschool learning videos", "educational songs for kids", "shapes and colors for kids", "learning songs"],
     "hashtags": ["#shapessong", "#learnshapes", "#kidssongs", "#preschool"], "playlist": "Learning Songs"},
    sky="sunset", styles=["bouncy marimba and claps"], outro="Shapes, hooray!"))

SONGS.append(song(
    "days-of-week", "DaysOfWeek", "meadow", ["Days of the", "Week Dance!"], ["Days of the Week Dance!"],
    [("ladybug", "Lily Ladybug", "🐞", "Monday's clapper"), ("fox", "Finn Fox", "🦊", "Tuesday's tapper"),
     ("chick", "Pip the Chick", "🐥", "Wednesday's wiggler"), ("frog", "Freddie Frog", "🐸", "Thursday's jumper"),
     ("bluebird", "Bobby Bluebird", "🐦", "Friday's spinner"), ("bunny", "Bella Bunny", "🐰", "Saturday's smiler"),
     ("bear", "Teddy Bear", "🧸", "loves a Sunday stretch")],
    [{"focus": [0, 1, 2, 3], "lines": ["On Monday, clap, clap, clap!", "On Tuesday, tap, tap, tap!", "On Wednesday, wiggle all around,", "on Thursday, jump up off the ground!"],
      "words": [w("MONDAY", R), w("TUESDAY", O), w("WEDNESDAY", Y), w("THURSDAY", G)]},
     {"focus": [4, 5, 6], "lines": ["On Friday, spin, spin, spin!", "On Saturday, grin, grin, grin!", "On Sunday, rest and stretch up tall,", "seven days, we love them all!"],
      "words": [w("FRIDAY", B), w("SATURDAY", P), w("SUNDAY", K), w("7 DAYS", G)]},
     {"lines": ["Can you say them, one by one?", "Seven days of dancing fun!", "Start with Monday, end with Sunday,", "then it starts again on Monday!"],
      "words": [None, None, w("MONDAY → SUNDAY", B), None]}],
    ["Seven days in every week,", "dance with me and take a peek!", "Monday, Tuesday, Wednesday, Thursday,", "Friday, Saturday, Sunday, hooray!"],
    {"song": "Days of the Week Dance", "shortTitle": "Days of the Week Song 📅 Dance Monday to Sunday!",
     "longTitle": "Days of the Week Dance 📅 Days of the Week Song for Kids | Monday to Sunday | Sunny Sprouts",
     "hook": "📅 Monday, Tuesday, Wednesday... Learn all seven days of the week with a dance for every day!",
     "about": "A dance-along song that teaches the seven days of the week in order. Every day has its own move: clap on Monday, tap on Tuesday, wiggle on Wednesday, jump on Thursday, spin on Friday, grin on Saturday and stretch on Sunday.",
     "learn": ["the 7 days of the week in order", "day names in English", "a dance move for every day", "the week starts again after Sunday"],
     "tags": ["days of the week song", "days of the week for kids", "monday tuesday wednesday song", "7 days of the week", "calendar song for kids", "preschool learning songs", "dance songs for kids", "educational songs for kids", "kindergarten learning", "learning songs"],
     "hashtags": ["#daysoftheweek", "#kidssongs", "#learningsongs", "#preschool"], "playlist": "Learning Songs"},
    styles=["funky kids dance pop"], outro="Hooray for the week!"))

SONGS.append(song(
    "weather", "Weather", "meadow", ["What's the", "Weather?"], ["What's the Weather?"],
    [("sun", "Sunny", "☀️", "warm, bright and always smiling"),
     ("cloud", "Puffy Cloud", "☁️", "brings the rain and the wind"),
     ("raindrop", "Drippy", "💧", "a raindrop who loves puddles"),
     ("snowflake", "Flurry", "❄️", "a sparkly little snowflake")],
    [{"focus": [0], "weather": "sun", "lines": ["Sunny, sunny, shining bright,", "warm and yellow, golden light!", "Put your sunhat on your head,", "let's go play outside instead!"],
      "words": [w("SUNNY", Y), None, w("SUNHAT", O), None]},
     {"focus": [1, 2], "weather": "rain", "lines": ["Rainy, rainy, pitter-pat,", "grab your boots and grab your hat!", "Jump in puddles, splish, splash, splash,", "here comes thunder, flash, flash, flash!"],
      "words": [w("RAINY", B), w("BOOTS", Y), w("SPLASH", B), None]},
     {"focus": [3], "weather": "snow", "lines": ["Snowy, snowy, cold and white,", "build a snowman, what a sight!", "Mittens on and scarf so warm,", "catch a snowflake, watch it form!"],
      "words": [w("SNOWY", B), w("SNOWMAN", P), w("MITTENS", R), None]}],
    ["What's the weather? Let's go see!", "Look outside with you and me!", "Sunny, rainy, windy, snow,", "every day a different show!"],
    {"song": "What's the Weather?", "shortTitle": "Weather Song ☀️🌧️ Sunny, Rainy, Windy, Snowy!",
     "longTitle": "What's the Weather? ☀️ Weather Song for Kids | Sunny, Rainy, Windy & Snowy | Sunny Sprouts",
     "hook": "☀️🌧️❄️ Is it sunny, rainy, windy or snowy? Let's look outside and sing about the weather!",
     "about": "A sing-along weather song for toddlers and preschoolers. Sunny, Puffy Cloud, Drippy the Raindrop and Flurry the Snowflake show four kinds of weather, and what to wear for each one: a sunhat, boots, a kite and mittens.",
     "learn": ["weather words: sunny, rainy, windy, snowy", "what to wear in different weather", "looking outside and describing the day", "seasons and nature"],
     "tags": ["weather song", "weather song for kids", "how's the weather song", "sunny rainy windy snowy", "weather for kids", "seasons song for kids", "preschool circle time songs", "rain song for kids", "educational songs for kids", "learning songs"],
     "hashtags": ["#weathersong", "#kidssongs", "#learningsongs", "#preschool"], "playlist": "Learning Songs"},
    styles=["breezy ukulele and whistles"], outro="Hooray for weather!",
    bridge={"focus": [1], "weather": "wind", "lines": ["Windy, windy, whoosh, whoosh, whoosh,", "leaves go flying, swoosh, swoosh, swoosh!", "Hold your kite and hold on tight,", "up it goes, a windy flight!"],
            "words": [w("WINDY", G), w("LEAVES", O), w("KITE", K), None]}))

SONGS.append(song(
    "head-tummy", "HeadTummy", "meadow", ["Head, Tummy,", "Knees & Feet!"], ["Head, Tummy, Knees and Feet!"],
    [("bear", "Teddy Bear", "🧸", "the best tummy tapper"), ("bunny", "Bella Bunny", "🐰", "wiggles her nose"),
     ("fox", "Finn Fox", "🦊", "waves his arms up high"), ("frog", "Freddie Frog", "🐸", "touches his toes super fast")],
    [{"focus": [0], "lines": ["Touch your head, tap, tap, tap,", "touch your tummy, clap, clap, clap!", "Touch your knees and bend down low,", "touch your feet and off we go!"],
      "words": [w("HEAD", R), w("TUMMY", O), w("KNEES", G), w("FEET", B)]},
     {"focus": [1, 2], "lines": ["Wiggle your nose and blink your eyes,", "wave your arms up to the skies!", "Shake your shoulders, one, two, three,", "rub your elbows, look at me!"],
      "words": [w("NOSE", K), w("ARMS", O), w("SHOULDERS", P), w("ELBOWS", B)]},
     {"focus": [3, 0], "lines": ["Faster now, are you ready? Go!", "Head, tummy, knees and toes!", "Slower now, so nice and slow,", "head, tummy, knees... and toes!"],
      "words": [w("FASTER!", R), None, w("slower...", B), None]}],
    ["Head, tummy, knees and feet,", "move your body to the beat!", "Head, tummy, knees and feet,", "dancing is a special treat!"],
    {"song": "Head, Tummy, Knees and Feet", "shortTitle": "Head, Tummy, Knees & Feet 🧸 Body Parts Song!",
     "longTitle": "Head, Tummy, Knees and Feet 🧸 Body Parts Song for Kids | Action Song | Sunny Sprouts",
     "hook": "🧸 Touch your head, tap your tummy, bend your knees and wiggle your feet!",
     "about": "An action song that teaches body parts while kids move along. Teddy Bear, Bella Bunny, Finn Fox and Freddie Frog touch their head, tummy, knees and feet, then wiggle noses, wave arms, shake shoulders and try it fast and slow!",
     "learn": ["body parts: head, tummy, knees, feet, nose, eyes, arms, shoulders, elbows", "fast and slow", "following actions", "moving to music"],
     "tags": ["body parts song", "head tummy knees and feet", "body parts for kids", "action songs for kids", "movement songs for toddlers", "brain break for kids", "learn body parts", "exercise song for kids", "dance songs for kids", "learning songs"],
     "hashtags": ["#bodypartssong", "#actionsongs", "#kidssongs", "#preschool"], "playlist": "Learning Songs"},
    styles=["bouncy funk bass and claps"], outro="Great job!", outro_text="YAY!"))

SONGS.append(song(
    "farm-animals", "FarmAnimals", "farm", ["Farm Animal", "Sounds!"], ["Farm Animal Sounds!"],
    [("cow", "Daisy Cow", "🐄", "says moo and gives us milk"), ("pig", "Pinky Pig", "🐷", "loves rolling in the mud"),
     ("duck", "Ducky", "🦆", "waddles to the pond"), ("sheep", "Woolly Sheep", "🐑", "has the fluffiest coat"),
     ("horse", "Henry Horse", "🐴", "gallops fast across the field")],
    [{"focus": [0, 1], "lines": ["The cow in the barn says, 'Moo, moo, moo!'", "She gives us milk, it's good for you!", "The pig in the mud says, 'Oink, oink, oink!'", "He rolls around and gives a wink!"],
      "words": [w("MOO!", P), None, w("OINK!", K), None]},
     {"focus": [2, 3], "lines": ["The duck in the pond says, 'Quack, quack, quack!'", "She waddles there and waddles back!", "The sheep on the hill says, 'Baa, baa, baa!'", "Her woolly coat is soft, ah-ah!"],
      "words": [w("QUACK!", Y), None, w("BAA!", B), None]},
     {"focus": [4], "lines": ["The horse in the field says, 'Neigh, neigh, neigh!'", "He gallops fast and loves to play!", "Now all together, loud and proud,", "let's make our farm sounds really loud!"],
      "words": [w("NEIGH!", O), None, w("ALL TOGETHER!", G), None]}],
    ["On the farm, on the farm,", "hear the animals by the barn!", "Moo, oink, quack and baa,", "neigh, neigh, ha, ha, ha!"],
    {"song": "Farm Animal Sounds", "shortTitle": "Farm Animal Sounds 🐄 Moo, Oink, Quack, Baa!",
     "longTitle": "Farm Animal Sounds 🐄 Animal Sounds Song for Kids | Cow, Pig, Duck, Sheep, Horse | Sunny Sprouts",
     "hook": "🐄🐷🦆 Moo, oink, quack, baa and neigh! Let's visit the farm and learn the animal sounds.",
     "about": "A happy farm song for babies, toddlers and preschoolers. Daisy Cow, Pinky Pig, Ducky, Woolly Sheep and Henry Horse each say their sound, and then everyone joins in together, loud and proud!",
     "learn": ["farm animals: cow, pig, duck, sheep, horse", "animal sounds: moo, oink, quack, baa, neigh", "where animals live on the farm", "making sounds together"],
     "tags": ["animal sounds song", "farm animals song", "farm animal sounds for kids", "animal sounds for toddlers", "farm song for kids", "cow pig duck sheep horse", "animals for kids", "baby animal sounds", "learn animals", "learning songs"],
     "hashtags": ["#animalsounds", "#farmanimals", "#kidssongs", "#toddlerlearning"], "playlist": "Animal Songs"},
    styles=["country banjo and fiddle", "barnyard fun"], outro="Ha, ha, hooray!"))

SONGS.append(song(
    "dino-stomp", "DinoStomp", "meadow", ["Dino", "Stomp!"], ["Dino Stomp!"],
    [("stego", "Steggy", "🦕", "has plates all down his back"), ("trex", "Rexy", "🦖", "big, loud and super friendly"),
     ("bronto", "Bronty", "🦕", "has the longest neck"), ("tricera", "Trixie", "🦖", "has three horns and a big frill")],
    [{"focus": [1], "lines": ["T-Rex is big and T-Rex is tall,", "he stomps so loud, it shakes us all!", "Little arms that go like this,", "and a roar you just can't miss: ROAR!"],
      "words": [None, w("STOMP", G), None, w("ROAR!", R)]},
     {"focus": [0, 3], "lines": ["Stegosaurus, plates on his back,", "walking slow along the track!", "Triceratops, horns, one, two, three,", "she's as friendly as can be!"],
      "words": [w("PLATES", O), None, w("3 HORNS", B), None]},
     {"focus": [2], "lines": ["Brontosaurus, long, long neck,", "eating leaves up high, let's check!", "Swing your tail and stomp your feet,", "dinosaurs dance to the beat!"],
      "words": [w("LONG NECK", P), w("LEAVES", G), w("TAIL", O), None]}],
    ["Dino stomp, dino stomp,", "stomp, stomp, stomp around!", "Dino stomp, dino stomp,", "make a dino sound: ROAR!"],
    {"song": "Dino Stomp", "shortTitle": "Dino Stomp 🦖 Stomp, Stomp, ROAR!",
     "longTitle": "Dino Stomp 🦖 Dinosaur Song for Kids | T-Rex, Stegosaurus, Triceratops | Sunny Sprouts",
     "hook": "🦖 Stomp, stomp, ROAR! Dance like a dinosaur with Rexy and friends!",
     "about": "A stompy dinosaur dance song for kids. Rexy the T-Rex, Steggy the Stegosaurus, Trixie the Triceratops and Bronty the Brontosaurus show their plates, horns, long neck and tiny arms, and everybody stomps and roars to the beat!",
     "learn": ["dinosaur names: T-Rex, Stegosaurus, Triceratops, Brontosaurus", "dinosaur features: plates, horns, long neck, tail", "counting to three", "stomping and moving to the beat"],
     "tags": ["dinosaur song", "dinosaur songs for kids", "dino song", "t rex song", "dinosaurs for kids", "dinosaur dance", "roar song", "triceratops stegosaurus", "action songs for kids", "dance songs for kids"],
     "hashtags": ["#dinosaursong", "#dinosaurs", "#kidssongs", "#trex"], "playlist": "Animal Songs"},
    sky="sunset", styles=["stompy drums and tuba bass"], outro="ROAR!", outro_text="ROAR!"))

SONGS.append(song(
    "ocean-friends", "OceanFriends", "ocean", ["Ocean", "Friends!"], ["Ocean Friends!"],
    [("crab", "Crabby", "🦀", "walks sideways and pinches"), ("fish", "Finny Fish", "🐠", "swims fast with a swish of his tail"),
     ("octopus", "Olivia Octopus", "🐙", "waves with eight long arms"), ("turtle", "Tilly Turtle", "🐢", "slow, steady and wise")],
    [{"focus": [1], "lines": ["Down in the ocean, deep and blue,", "little fish says, 'How do you do?'", "Swim, swim, swish your tail,", "follow me, we'll find a whale!"],
      "words": [None, w("FISH", O), w("SWIM", B), w("WHALE", B)]},
     {"focus": [2, 0], "lines": ["Octopus has eight long arms,", "waving hello with all her charms!", "Crabby walks from side to side,", "pinch, pinch, pinch, then runs to hide!"],
      "words": [w("8 ARMS", P), None, w("CRAB", R), w("PINCH!", R)]},
     {"focus": [3], "lines": ["Turtle swims so slow and steady,", "with her shell, she's always ready!", "Bubbles rising, pop, pop, pop,", "ocean dancing, never stop!"],
      "words": [w("TURTLE", G), w("SHELL", G), w("BUBBLES", B), None]}],
    ["Splash, splash, ocean friends,", "the fun in the sea never ends!", "Swim, swim, wiggle and wave,", "let's explore, come on, be brave!"],
    {"song": "Ocean Friends", "shortTitle": "Ocean Friends 🐠 Sea Animals Song for Kids!",
     "longTitle": "Ocean Friends 🐠 Sea Animals Song for Kids | Fish, Octopus, Crab & Turtle | Sunny Sprouts",
     "hook": "🐠🐙🦀🐢 Dive into the deep blue sea and meet our ocean friends!",
     "about": "A splashy sea animals song. Finny Fish swishes his tail, Olivia Octopus waves eight long arms, Crabby walks sideways and Tilly Turtle swims slow and steady, all among bubbles and seaweed.",
     "learn": ["sea animals: fish, octopus, crab, turtle, whale", "an octopus has 8 arms", "crabs walk sideways", "swimming, waving and wiggling"],
     "tags": ["ocean animals song", "sea animals for kids", "under the sea song for kids", "fish song", "octopus song", "sea creatures for kids", "ocean song for toddlers", "animal songs for kids", "summer songs for kids", "learning songs"],
     "hashtags": ["#oceananimals", "#seaanimals", "#kidssongs", "#oceanfriends"], "playlist": "Animal Songs"},
    styles=["calypso steel drums", "sunny reggae-pop bounce"], outro="Splash!", outro_text="SPLASH!"))

SONGS.append(song(
    "fruit-squad", "FruitSquad", "meadow", ["Fruit", "Squad!"], ["Fruit Squad Song!"],
    [("banana", "Benny Banana", "🍌", "long, yellow and silly"), ("apple", "Annie Apple", "🍎", "crunchy and red"),
     ("strawberry", "Stella Strawberry", "🍓", "sweet with little seeds"), ("orange", "Ollie Orange", "🍊", "round, bright and juicy"),
     ("watermelon", "Wally Watermelon", "🍉", "the biggest fruit in the squad")],
    [{"focus": [1, 0], "lines": ["Apple, apple, red and round,", "crunchy, munchy, what a sound!", "Banana, banana, long and yellow,", "peel it, eat it, happy fellow!"],
      "words": [w("APPLE", R), None, w("BANANA", Y), None]},
     {"focus": [2, 3], "lines": ["Strawberry, so sweet and red,", "little seeds all on her head!", "Orange, orange, round and bright,", "juicy, squeezy, take a bite!"],
      "words": [w("STRAWBERRY", R), None, w("ORANGE", O), None]},
     {"focus": [4], "lines": ["Watermelon, big and green,", "pinkest inside you've ever seen!", "Fruit is fun and fruit is sweet,", "Fruit Squad is the best to eat!"],
      "words": [w("WATERMELON", G), None, None, None]}],
    ["Fruit Squad, Fruit Squad, here we come,", "juicy, yummy, yum, yum, yum!", "Eat a rainbow every day,", "strong and healthy, hip, hooray!"],
    {"song": "Fruit Squad", "shortTitle": "Fruit Squad 🍓 Yummy Fruit Song for Kids!",
     "longTitle": "Fruit Squad Song 🍓 Fruit Names for Kids | Healthy Eating Song | Sunny Sprouts",
     "hook": "🍎🍌🍓🍊🍉 Here comes the Fruit Squad! Juicy, yummy, yum, yum, yum!",
     "about": "A juicy sing-along that teaches fruit names and healthy eating. Annie Apple, Benny Banana, Stella Strawberry, Ollie Orange and Wally Watermelon sing about their colors and shapes, and remind kids to eat a rainbow every day.",
     "learn": ["fruit names: apple, banana, strawberry, orange, watermelon", "fruit colors and shapes", "eating a rainbow of fruit", "healthy food choices"],
     "tags": ["fruit song", "fruit song for kids", "fruits for kids", "healthy eating song", "learn fruit names", "fruits and vegetables for kids", "food song for kids", "eat a rainbow", "healthy habits for kids", "veggie squad"],
     "hashtags": ["#fruitsong", "#healthyeating", "#kidssongs", "#fruits"], "playlist": "Healthy Habits Songs"},
    styles=["tropical marimba and claps"], outro="Hip, hip, hooray!"))

if __name__ == "__main__":
    print("\n".join(SONGS))
