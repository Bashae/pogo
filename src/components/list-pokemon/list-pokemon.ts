import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { GeoProvider } from '../../providers/geo/geo';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddQuestPage } from '../../pages/add-quest/add-quest';
import { AddRaidPage } from '../../pages/add-raid/add-raid';
import { AddTradePage } from '../../pages/add-trade/add-trade';
import { AddModalPage } from '../../pages/add-modal/add-modal';
import { BehaviorSubject } from 'rxjs';
import { RaidPage } from '../../pages/raid/raid';

@Component({
  selector: 'list-pokemon',
  templateUrl: 'list-pokemon.html'
})
export class ListPokemonComponent {
  public map: GoogleMap;
  searchType: string = "raids";
  mapLat: any;
  mapLon: any;
  isLocatorActive: boolean;
  location: any;

  nearbyIterables: any = [];
  nearbyRaids: any = [];
  nearbyQuests: any = [];
  // nearbyTrades: any = [];

  selectedPokeman: any;

  pokeman = [
    {"name": "Bulbasaur", "generation": 1, "image": "001-bulbasaur", "number": "#001"},
    {"name": "Ivysaur", "generation": 1, "image": "002-ivysaur", "number": "#002"},
    {"name": "Venuasaur", "generation": 1, "image": "003-venusaur", "number": "#003"},
    {"name": "Charmander", "generation": 1, "image": "004-charmander", "number": "#004"},
    {"name": "Charmeleon", "generation": 1, "image": "005-charmeleon", "number": "#005"},
    {"name": "Charizard", "generation": 1, "image": "006-charizard", "number": "#006"},
    {"name": "Squirtle", "generation": 1, "image": "007-squirtle", "number": "#007"},
    {"name": "Wartortle", "generation": 1, "image": "008-wartortle", "number": "#008"},
    {"name": "Blastoise", "generation": 1, "image": "009-blastoise", "number": "#009"},
    {"name": "Caterpie", "generation": 1, "image": "010-caterpie", "number": "#010"},
    {"name": "Metapod", "generation": 1, "image": "011-metapod", "number": "#011"},
    {"name": "Butterfree", "generation": 1, "image": "012-butterfree", "number": "#012"},
    {"name": "Weedle", "generation": 1, "image": "013-weedle", "number": "#013"},
    {"name": "Kakuna", "generation": 1, "image": "014-kakuna", "number": "#014"},
    {"name": "Beedrill", "generation": 1, "image": "015-beedrill", "number": "#015"},
    {"name": "Pidgey", "generation": 1, "image": "016-pidgey", "number": "#016"},
    {"name": "Pidgeotto", "generation": 1, "image": "017-pidgeotto", "number": "#017"},
    {"name": "Pidgeot", "generation": 1, "image": "018-pidgeot", "number": "#018"},
    {"name": "Rattata (Alola)", "generation": 1, "image": "019-rattata-alola", "number": "#019A"},
    {"name": "Rattata", "generation": 1, "image": "019-rattata", "number": "#019"},
    {"name": "Raticate (Alola)", "generation": 1, "image": "020-raticate-alola", "number": "#020A"},
    {"name": "Raticate", "generation": 1, "image": "020-raticate", "number": "#020"},
    {"name": "Spearow", "generation": 1, "image": "021-spearow", "number": "#021"},
    {"name": "Fearow", "generation": 1, "image": "022-fearow", "number": "#022"},
    {"name": "Ekans", "generation": 1, "image": "023-ekans", "number": "#023"},
    {"name": "Arbok", "generation": 1, "image": "024-arbok", "number": "#024"},
    {"name": "Pikachu", "generation": 1, "image": "025-pikachu", "number": "#025"},
    {"name": "Raichu (Alola)", "generation": 1, "image": "026-raichu-alola", "number": "#026A"},
    {"name": "Raichu", "generation": 1, "image": "026-raichu", "number": "#026"},
    {"name": "Sandshrew (Alola)", "generation": 1, "image": "027-sandshrew-alola", "number": "#027A"},
    {"name": "Sandshrew", "generation": 1, "image": "027-sandshrew", "number": "#027"},
    {"name": "Sandslash (Alola)", "generation": 1, "image": "028-sandslash-alola", "number": "#028A"},
    {"name": "Sandslash", "generation": 1, "image": "028-sandslash", "number": "#028"},
    {"name": "Nidoran♀", "generation": 1, "image": "029-nidoran-f", "number": "#029"},
    {"name": "Nidorina", "generation": 1, "image": "030-nidorina", "number": "#030"},
    {"name": "Nidoqueen", "generation": 1, "image": "031-nidoqueen", "number": "#031"},
    {"name": "Nidoran♂", "generation": 1, "image": "032-nidoran-m", "number": "#032"},
    {"name": "Nidorino", "generation": 1, "image": "033-nidorino", "number": "#033"},
    {"name": "Nidoking", "generation": 1, "image": "034-nidoking", "number": "#034"},
    {"name": "Clefairy", "generation": 1, "image": "035-clefairy", "number": "#035"},
    {"name": "Clefable", "generation": 1, "image": "036-clefable", "number": "#036"},
    {"name": "Vulpix (Alola)", "generation": 1, "image": "037-vulpix-alola", "number": "#037A"},
    {"name": "Vulpix", "generation": 1, "image": "037-vulpix", "number": "#037"},
    {"name": "Ninetales (Alola)", "generation": 1, "image": "038-ninetales-alola", "number": "#038A"},
    {"name": "Ninetales", "generation": 1, "image": "038-ninetales", "number": "#038"},
    {"name": "Jigglypuff", "generation": 1, "image": "039-jigglypuff", "number": "#039"},
    {"name": "Wigglytuff", "generation": 1, "image": "040-wigglytuff", "number": "#040"},
    {"name": "Zubat", "generation": 1, "image": "041-zubat", "number": "#041"},
    {"name": "Golbat", "generation": 1, "image": "042-golbat", "number": "#042"},
    {"name": "Oddish", "generation": 1, "image": "043-oddish", "number": "#043"},
    {"name": "Gloom", "generation": 1, "image": "044-gloom", "number": "#044"},
    {"name": "Vileplume", "generation": 1, "image": "045-vileplume", "number": "#045"},
    {"name": "Paras", "generation": 1, "image": "046-paras", "number": "#046"},
    {"name": "Parasect", "generation": 1, "image": "047-parasect", "number": "#047"},
    {"name": "Venonat", "generation": 1, "image": "048-venonat", "number": "#048"},
    {"name": "Venomoth", "generation": 1, "image": "049-venomoth", "number": "#049"},
    {"name": "Diglett (Alola)", "generation": 1, "image": "050-diglett-alola", "number": "#050A"},
    {"name": "Diglett", "generation": 1, "image": "050-diglett", "number": "#050"},
    {"name": "Dugtrio (Alola)", "generation": 1, "image": "051-dugtrio-alola", "number": "#051A"},
    {"name": "Dugtrio", "generation": 1, "image": "051-dugtrio", "number": "#051"},
    {"name": "Meowth (Alola)", "generation": 1, "image": "052-meowth-alola", "number": "#052A"},
    {"name": "Meowth", "generation": 1, "image": "052-meowth", "number": "#052"},
    {"name": "Persian (Alola)", "generation": 1, "image": "053-persian-alola", "number": "#053A"},
    {"name": "Persian", "generation": 1, "image": "053-persian", "number": "#053"},
    {"name": "Psyduck", "generation": 1, "image": "054-psyduck", "number": "#054"},
    {"name": "Golduck", "generation": 1, "image": "055-golduck", "number": "#055"},
    {"name": "Mankey", "generation": 1, "image": "056-mankey", "number": "#056"},
    {"name": "Primeape", "generation": 1, "image": "057-primeape", "number": "#057"},
    {"name": "Growlithe", "generation": 1, "image": "058-growlithe", "number": "#058"},
    {"name": "Arcanine", "generation": 1, "image": "059-arcanine", "number": "#059"},
    {"name": "Poliwag", "generation": 1, "image": "060-poliwag", "number": "#060"},
    {"name": "Poliwhirl", "generation": 1, "image": "061-poliwhirl", "number": "#061"},
    {"name": "Poliwrath", "generation": 1, "image": "062-poliwrath", "number": "#062"},
    {"name": "Abra", "generation": 1, "image": "063-abra", "number": "#063"},
    {"name": "Kadabra", "generation": 1, "image": "064-kadabra", "number": "#064"},
    {"name": "Alakazam", "generation": 1, "image": "065-alakazam", "number": "#065"},
    {"name": "Machop", "generation": 1, "image": "066-machop", "number": "#066"},
    {"name": "Machoke", "generation": 1, "image": "067-machoke", "number": "#067"},
    {"name": "Machamp", "generation": 1, "image": "068-machamp", "number": "#068"},
    {"name": "Bellsprout", "generation": 1, "image": "069-bellsprout", "number": "#069"},
    {"name": "Weepinbell", "generation": 1, "image": "070-weepinbell", "number": "#070"},
    {"name": "Victreebel", "generation": 1, "image": "071-victreebel", "number": "#071"},
    {"name": "Tentacool", "generation": 1, "image": "072-tentacool", "number": "#072"},
    {"name": "Tentacruel", "generation": 1, "image": "073-tentacruel", "number": "#073"},
    {"name": "Geodude (Alola)", "generation": 1, "image": "074-geodude-alola", "number": "#074A"},
    {"name": "Geodude", "generation": 1, "image": "074-geodude", "number": "#074"},
    {"name": "Graveler (Alola)", "generation": 1, "image": "075-graveler-alola", "number": "#075A"},
    {"name": "Graveler", "generation": 1, "image": "075-graveler", "number": "#075"},
    {"name": "Golem (Alola)", "generation": 1, "image": "076-golem-alola", "number": "#076A"},
    {"name": "Golem", "generation": 1, "image": "076-golem", "number": "#076"},
    {"name": "Ponyta", "generation": 1, "image": "077-ponyta", "number": "#077"},
    {"name": "Rapidash", "generation": 1, "image": "078-rapidash", "number": "#078"},
    {"name": "Slowpoke", "generation": 1, "image": "079-slowpoke", "number": "#079"},
    {"name": "Slowbro", "generation": 1, "image": "080-slowbro", "number": "#080"},
    {"name": "Magnemite", "generation": 1, "image": "081-magnemite", "number": "#081"},
    {"name": "Magneton", "generation": 1, "image": "082-magneton", "number": "#082"},
    {"name": "Farfetch", "generation": 1, "image": "083-farfetchd", "number": "#083"},
    {"name": "Doduo", "generation": 1, "image": "084-doduo", "number": "#084"},
    {"name": "Dodrio", "generation": 1, "image": "085-dodrio", "number": "#085"},
    {"name": "Seel", "generation": 1, "image": "086-seel", "number": "#086"},
    {"name": "Dewgong", "generation": 1, "image": "087-dewgong", "number": "#087"},
    {"name": "Grimer (Alola)", "generation": 1, "image": "088-grimer-alola", "number": "#088A"},
    {"name": "Grimer", "generation": 1, "image": "088-grimer", "number": "#088"},
    {"name": "Muk (Alola)", "generation": 1, "image": "089-muk-alola", "number": "#089A"},
    {"name": "Muk", "generation": 1, "image": "089-muk", "number": "#089"},
    {"name": "Shellder", "generation": 1, "image": "090-shellder", "number": "#090"},
    {"name": "Cloyster", "generation": 1, "image": "091-cloyster", "number": "#091"},
    {"name": "Gastly", "generation": 1, "image": "092-gastly", "number": "#092"},
    {"name": "Haunter", "generation": 1, "image": "093-haunter", "number": "#093"},
    {"name": "Gengar", "generation": 1, "image": "094-gengar", "number": "#094"},
    {"name": "Onix", "generation": 1, "image": "095-onix", "number": "#095"},
    {"name": "Drowzee", "generation": 1, "image": "096-drowzee", "number": "#096"},
    {"name": "Hypno", "generation": 1, "image": "097-hypno", "number": "#097"},
    {"name": "Krabby", "generation": 1, "image": "098-krabby", "number": "#098"},
    {"name": "Kingler", "generation": 1, "image": "099-kingler", "number": "#099"},
    {"name": "Voltorb", "generation": 1, "image": "100-voltorb", "number": "#100"},
    {"name": "Electrode", "generation": 1, "image": "101-electrode", "number": "#101"},
    {"name": "Exeggcute", "generation": 1, "image": "102-exeggcute", "number": "#102"},
    {"name": "Exeggutor (Alola)", "generation": 1, "image": "103-exeggutor-alola", "number": "#103A"},
    {"name": "Exeggutor", "generation": 1, "image": "103-exeggutor", "number": "#103"},
    {"name": "Cubone", "generation": 1, "image": "104-cubone", "number": "#104"},
    {"name": "Marowak (Alola)", "generation": 1, "image": "105-marowak-alola", "number": "#105A"},
    {"name": "Marowak", "generation": 1, "image": "105-marowak", "number": "#105"},
    {"name": "Hitmonlee", "generation": 1, "image": "106-hitmonlee", "number": "#106"},
    {"name": "Hitmonchan", "generation": 1, "image": "107-hitmonchan", "number": "#107"},
    {"name": "Lickitung", "generation": 1, "image": "108-lickitung", "number": "#108"},
    {"name": "Koffing", "generation": 1, "image": "109-koffing", "number": "#109"},
    {"name": "Weezing", "generation": 1, "image": "110-weezing", "number": "#110"},
    {"name": "Rhyhorn", "generation": 1, "image": "111-rhyhorn", "number": "#111"},
    {"name": "Rhydon", "generation": 1, "image": "112-rhydon", "number": "#112"},
    {"name": "Chansey", "generation": 1, "image": "113-chansey", "number": "#113"},
    {"name": "Tangela", "generation": 1, "image": "114-tangela", "number": "#114"},
    {"name": "Kangaskhan", "generation": 1, "image": "115-kangaskhan", "number": "#115"},
    {"name": "Horsea", "generation": 1, "image": "116-horsea", "number": "#116"},
    {"name": "Seadra", "generation": 1, "image": "117-seadra", "number": "#117"},
    {"name": "Goldeen", "generation": 1, "image": "118-goldeen", "number": "#118"},
    {"name": "Seaking", "generation": 1, "image": "119-seaking", "number": "#119"},
    {"name": "Staryu", "generation": 1, "image": "120-staryu", "number": "#120"},
    {"name": "Starmie", "generation": 1, "image": "121-starmie", "number": "#121"},
    {"name": "Mr. Mime", "generation": 1, "image": "122-mrmime", "number": "#122"},
    {"name": "Scyther", "generation": 1, "image": "123-scyther", "number": "#123"},
    {"name": "Jynx ", "generation": 1, "image": "124-jynx", "number": "#124"},
    {"name": "Electabuzz", "generation": 1, "image": "125-electabuzz", "number": "#125"},
    {"name": "Magmar", "generation": 1, "image": "126-magmar", "number": "#126"},
    {"name": "Pinsir", "generation": 1, "image": "127-pinsir", "number": "#127"},
    {"name": "Tauros", "generation": 1, "image": "128-tauros", "number": "#128"},
    {"name": "Magikarp", "generation": 1, "image": "129-magikarp", "number": "#129"},
    {"name": "Gyarados", "generation": 1, "image": "130-gyarados", "number": "#130"},
    {"name": "Lapras", "generation": 1, "image": "131-lapras", "number": "#131"},
    {"name": "Ditto", "generation": 1, "image": "132-ditto", "number": "#132"},
    {"name": "Eevee", "generation": 1, "image": "133-eevee", "number": "#133"},
    {"name": "Vaporeon", "generation": 1, "image": "134-vaporeon", "number": "#134"},
    {"name": "Jolteon", "generation": 1, "image": "135-jolteon", "number": "#135"},
    {"name": "Flareon", "generation": 1, "image": "136-flareon", "number": "#136"},
    {"name": "Porygon", "generation": 1, "image": "137-porygon", "number": "#137"},
    {"name": "Omanyte", "generation": 1, "image": "138-omanyte", "number": "#138"},
    {"name": "Omastar", "generation": 1, "image": "139-omastar", "number": "#139"},
    {"name": "Kabuto", "generation": 1, "image": "140-kabuto", "number": "#140"},
    {"name": "Kabutops", "generation": 1, "image": "141-kabutops", "number": "141" },
    {"name": "Aerodactyl", "generation": 1, "image": "142-aerodactyl", "number": "142"},
    {"name": "Snorlax", "generation": 1, "image": "143-snorlax", "number": "143"},
    {"name": "Articuno", "generation": 1, "image": "144-articuno", "number": "144"},
    {"name": "Zapdos", "generation": 1, "image": "145-zapdos", "number": "#145"},
    {"name": "Moltres", "generation": 1, "image": "146-moltres", "number": "#146"},
    {"name": "Dratini", "generation": 1, "image": "147-dratini", "number": "#147"},
    {"name": "Dragonair", "generation": 1, "image": "148-dragonair", "number": "#148"},
    {"name": "Dragonite", "generation": 1, "image": "149-dragonite", "number": "#149"},
    {"name": "Mewtwo", "generation": 1, "image": "150-mewtwo", "number": "#150"},
    {"name": "Mew", "generation": 1, "image": "151-mew", "number": "#151"},
    {"name": "Chikorita", "generation": 1, "image": "152-chikorita", "number": "#152"},
    {"name": "Bayleef", "generation": 1, "image": "153-bayleef", "number": "#153"},
    {"name": "Meganium", "generation": 1, "image": "154-meganium", "number": "#154"},
    {"name": "Cyndaquil", "generation": 1, "image": "155-cyndaquil", "number": "#155"},
    {"name": "Quilava", "generation": 1, "image": "156-quilava", "number": "#156"},
    {"name": "Typhlosion", "generation": 1, "image": "157-typhlosion", "number": "#157"},
    {"name": "Totodile", "generation": 1, "image": "158-totodile", "number": "#158"},
    {"name": "Croconaw", "generation": 1, "image": "159-croconaw", "number": "#159"},
    {"name": "Feraligatr", "generation": 1, "image": "160-feraligatr", "number": "#160"},
    {"name": "Sentret", "generation": 1, "image": "161-sentret", "number": "#161"},
    {"name": "Furret", "generation": 1, "image": "162-furret", "number": "#162"},
    {"name": "Hoothoot", "generation": 1, "image": "163-hoothoot", "number": "#163"},
    {"name": "Noctowl", "generation": 1, "image": "164-noctowl", "number": "#164"},
    {"name": "Ledyba", "generation": 1, "image": "165-ledyba", "number": "#165"},
    {"name": "Ledian", "generation": 1, "image": "166-ledian", "number": "#166"},
    {"name": "Spinarak", "generation": 1, "image": "167-spinarak", "number": "#167"},
    {"name": "Ariados", "generation": 1, "image": "168-ariados", "number": "#168"},
    {"name": "Crobat", "generation": 1, "image": "169-crobat", "number": "#169"},
    {"name": "Chinchou", "generation": 1, "image": "170-chinchou", "number": "#170"},
    {"name": "Lanturn", "generation": 1, "image": "171-lanturn", "number": "#171"},
    {"name": "Pichu", "generation": 1, "image": "172-pichu", "number": "#172"},
    {"name": "Cleffa", "generation": 1, "image": "173-cleffa", "number": "#173"},
    {"name": "Igglybuff", "generation": 1, "image": "174-igglybuff", "number": "#174"},
    {"name": "Togepi", "generation": 1, "image": "175-togepi", "number": "#175"},
    {"name": "Togetic", "generation": 1, "image": "176-togetic", "number": "#176"},
    {"name": "Natu", "generation": 1, "image": "177-natu", "number": "#177"},
    {"name": "Xatu", "generation": 1, "image": "178-xatu", "number": "#178"},
    {"name": "Mareep", "generation": 1, "image": "179-mareep", "number": "#179"},
    {"name": "Flaaffy", "generation": 1, "image": "180-flaaffy", "number": "#180"},
    {"name": "Ampharos", "generation": 1, "image": "181-ampharos", "number": "#181"},
    {"name": "Bellossom", "generation": 1, "image": "182-bellossom", "number": "#182"},
    {"name": "Marill", "generation": 1, "image": "183-marill", "number": "#183"},
    {"name": "Azumarill", "generation": 1, "image": "184-azumarill", "number": "#184"},
    {"name": "Sudowoodo", "generation": 1, "image": "185-sudowoodo", "number": "#185"},
    {"name": "Politoed", "generation": 1, "image": "186-politoed", "number": "#186"},
    {"name": "Hoppip", "generation": 1, "image": "187-hoppip", "number": "#187"},
    {"name": "Skiploom", "generation": 1, "image": "188-skiploom", "number": "#188"},
    {"name": "Jumpluff", "generation": 1, "image": "189-jumpluff", "number": "#189"},
    {"name": "Aipom", "generation": 1, "image": "190-aipom", "number": "#190"},
    {"name": "Sunkern", "generation": 1, "image": "191-sunkern", "number": "#191"},
    {"name": "Sunflora", "generation": 1, "image": "192-sunflora", "number": "#192"},
    {"name": "Yanma", "generation": 1, "image": "193-yanma", "number": "#193"},
    {"name": "Wooper", "generation": 1, "image": "194-wooper", "number": "#194"},
    {"name": "Quagsire", "generation": 1, "image": "195-quagsire", "number": "#195"},
    {"name": "Espeon", "generation": 1, "image": "196-espeon", "number": "#196"},
    {"name": "Umbreon", "generation": 1, "image": "197-umbreon", "number": "#197"},
    {"name": "Murkrow", "generation": 1, "image": "198-murkrow", "number": "#198"},
    {"name": "Slowking", "generation": 1, "image": "199-slowking", "number": "#199"},
    {"name": "Misdreavus", "generation": 1, "image": "200-misdreavus", "number": "#200"},
    {"name": "Unown", "generation": 1, "image": "201-unown-a", "number": "#201"},
    {"name": "Wobbuffet", "generation": 1, "image": "202-wobbuffet", "number": "#202"},
    {"name": "Girafarig", "generation": 1, "image": "203-girafarig", "number": "#203"},
    {"name": "Pineco", "generation": 1, "image": "204-pineco", "number": "#204"},
    {"name": "Forretres", "generation": 1, "image": "205-forretress", "number": "#205"},
    {"name": "Dunsparce", "generation": 1, "image": "206-dunsparce", "number": "#206"},
    {"name": "Gligar", "generation": 1, "image": "207-gligar", "number": "#207"},
    {"name": "Steelix", "generation": 1, "image": "208-steelix", "number": "#208"},
    {"name": "Snubbull", "generation": 1, "image": "209-snubbull", "number": "#209"},
    {"name": "Granbull", "generation": 1, "image": "210-granbull", "number": "#210"},
    {"name": "Qwilfish", "generation": 1, "image": "211-qwilfish", "number": "#211"},
    {"name": "Scizor", "generation": 1, "image": "212-scizor", "number": "#212"},
    {"name": "Shuckle", "generation": 1, "image": "213-shuckle", "number": "#213"},
    {"name": "Heracross", "generation": 1, "image": "214-heracross", "number": "#214"},
    {"name": "Sneasel", "generation": 1, "image": "215-sneasel", "number": "#215"},
    {"name": "Teddiursa", "generation": 1, "image": "216-teddiursa", "number": "#216"},
    {"name": "Ursaring", "generation": 1, "image": "217-ursaring", "number": "#217"},
    {"name": "Slugma", "generation": 1, "image": "218-slugma", "number": "#218"},
    {"name": "Magcargo", "generation": 1, "image": "219-magcargo", "number": "#219"},
    {"name": "Swinub", "generation": 1, "image": "220-swinub", "number": "#220"},
    {"name": "Piloswine", "generation": 1, "image": "221-piloswine", "number": "#221"},
    {"name": "Corsola", "generation": 1, "image": "222-corsola", "number": "#222"},
    {"name": "Remoraid", "generation": 1, "image": "223-remoraid", "number": "#223"},
    {"name": "Octillery", "generation": 1, "image": "224-octillery", "number": "#224"},
    {"name": "Delibird", "generation": 1, "image": "225-delibird", "number": "#225"},
    {"name": "Mantine", "generation": 1, "image": "226-mantine", "number": "#226"},
    {"name": "Skarmory", "generation": 1, "image": "227-skarmory", "number": "#227"},
    {"name": "Houndour", "generation": 1, "image": "228-houndour", "number": "#228"},
    {"name": "Houndoom", "generation": 1, "image": "229-houndoom", "number": "#229"},
    {"name": "Kingdra", "generation": 1, "image": "230-kingdra", "number": "#230"},
    {"name": "Phanpy", "generation": 1, "image": "231-phanpy", "number": "#231"},
    {"name": "Donphan", "generation": 1, "image": "232-donphan", "number": "#232"},
    {"name": "Porygon2", "generation": 1, "image": "233-porygon2", "number": "#233"},
    {"name": "Stantler", "generation": 1, "image": "234-stantler", "number": "#234"},
    {"name": "Smeargle", "generation": 1, "image": "235-smeargle", "number": "#235"},
    {"name": "Tyrogue", "generation": 1, "image": "236-tyrogue", "number": "#236"},
    {"name": "Hitmontop", "generation": 1, "image": "237-hitmontop", "number": "#237"},
    {"name": "Smoochum", "generation": 1, "image": "238-smoochum", "number": "#238"},
    {"name": "Elekid", "generation": 1, "image": "239-elekid", "number": "#239"},
    {"name": "Magby", "generation": 1, "image": "240-magby", "number": "#240"},
    {"name": "Miltank", "generation": 1, "image": "241-miltank", "number": "#241"},
    {"name": "Blissey", "generation": 1, "image": "242-blissey", "number": "#242"},
    {"name": "Raikou", "generation": 1, "image": "243-raikou", "number": "#243"},
    {"name": "Entei", "generation": 1, "image": "244-entei", "number": "#244"},
    {"name": "Suicune", "generation": 1, "image": "245-suicune", "number": "#245"},
    {"name": "Larvitar", "generation": 1, "image": "246-larvitar", "number": "#246"},
    {"name": "Pupitar", "generation": 1, "image": "247-pupitar", "number": "#247"},
    {"name": "Tyranitar", "generation": 1, "image": "248-tyranitar", "number": "#248"},
    {"name": "Lugia", "generation": 1, "image": "249-lugia", "number": "#249"},
    {"name": "Ho-Oh", "generation": 1, "image": "250-hooh", "number": "#250"},
    {"name": "Celebi", "generation": 1, "image": "251-celebi", "number": "#251"},
    {"name": "Treecko", "generation": 1, "image": "252-treecko", "number": "#252"},
    {"name": "Grovyle", "generation": 1, "image": "253-grovyle", "number": "#253"},
    {"name": "Sceptile", "generation": 1, "image": "254-sceptille", "number": "#254"},
    {"name": "Torchic", "generation": 1, "image": "255-torchic", "number": "#255"},
    {"name": "Combusken", "generation": 1, "image": "256-combusken", "number": "#256"},
    {"name": "Blaziken", "generation": 1, "image": "257-blaziken", "number": "#257"},
    {"name": "Mudkip", "generation": 1, "image": "258-mudkip", "number": "#258"},
    {"name": "Marshtomp", "generation": 1, "image": "259-marshtomp", "number": "#259"},
    {"name": "Swampert", "generation": 1, "image": "260-swampert", "number": "#260"},
    {"name": "Poochyena", "generation": 1, "image": "261-poochyena", "number": "#261"},
    {"name": "Mightyena", "generation": 1, "image": "262-mightyena", "number": "#262"},
    {"name": "Zigzagoon", "generation": 1, "image": "263-zigzagoon", "number": "#263"},
    {"name": "Linoone", "generation": 1, "image": "264-linoone", "number": "#264"},
    {"name": "Wurmple", "generation": 1, "image": "265-wurmple", "number": "#265"},
    {"name": "Silcoon", "generation": 1, "image": "266-silcoon", "number": "#266"},
    {"name": "Beautifly", "generation": 1, "image": "267-beautifly", "number": "#267"},
    {"name": "Cascoon", "generation": 1, "image": "268-cascoon", "number": "#268"},
    {"name": "Dustox", "generation": 1, "image": "269-dustox", "number": "#269"},
    {"name": "Lotad", "generation": 1, "image": "270-lotad", "number": "#270"},
    {"name": "Lombre", "generation": 1, "image": "271-lombre", "number": "#271"},
    {"name": "Ludicolo", "generation": 1, "image": "272-ludicolo", "number": "#272"},
    {"name": "Seedot", "generation": 1, "image": "273-seedot", "number": "#273"},
    {"name": "Nuzleaf", "generation": 1, "image": "274-nuzleaf", "number": "#274"},
    {"name": "Shiftry", "generation": 1, "image": "275-shiftry", "number": "#275"},
    {"name": "Taillow", "generation": 1, "image": "276-taillow", "number": "#276"},
    {"name": "Swellow", "generation": 1, "image": "277-swellow", "number": "#277"},
    {"name": "Wingull", "generation": 1, "image": "278-wingull", "number": "#278"},
    {"name": "Pelipper", "generation": 1, "image": "279-pelipper", "number": "#279"},
    {"name": "Ralts", "generation": 1, "image": "280-ralts", "number": "#280"},
    {"name": "Kirlia", "generation": 1, "image": "281-kirlia", "number": "#281"},
    {"name": "Gardevoir", "generation": 1, "image": "282-gardevoir", "number": "#282"},
    {"name": "Surskit", "generation": 1, "image": "283-surskit", "number": "#283"},
    {"name": "Masquerain", "generation": 1, "image": "284-masquerain", "number": "#284"},
    {"name": "Shroomish", "generation": 1, "image": "285-shroomish", "number": "#285"},
    {"name": "Breloom", "generation": 1, "image": "286-breloom", "number": "#286"},
    {"name": "Slakoth", "generation": 1, "image": "287-slakoth", "number": "#287"},
    {"name": "Vigoroth", "generation": 1, "image": "288-vigoroth", "number": "#288"},
    {"name": "Slaking", "generation": 1, "image": "289-slaking", "number": "#289"},
    {"name": "Nincada", "generation": 1, "image": "290-nincada", "number": "#290"},
    {"name": "Ninjask", "generation": 1, "image": "291-niniask", "number": "#291"},
    {"name": "Shedinja", "generation": 1, "image": "292-shedinja", "number": "#292"},
    {"name": "Whismur", "generation": 1, "image": "293-whismur", "number": "#293"},
    {"name": "Loudred", "generation": 1, "image": "294-loudred", "number": "#294"},
    {"name": "Exploud", "generation": 1, "image": "295-exploud", "number": "#295"},
    {"name": "Makuhita", "generation": 1, "image": "296-makuhita", "number": "#296"},
    {"name": "Hariyama", "generation": 1, "image": "297-hariyama", "number": "#297"},
    {"name": "Azurill", "generation": 1, "image": "298-azurill", "number": "#298"},
    {"name": "Nosepass", "generation": 1, "image": "299-nosepass", "number": "#299"},
    {"name": "Skitty", "generation": 1, "image": "300-skitty", "number": "#300"},
    {"name": "Delcatty", "generation": 1, "image": "301-delcatty", "number": "#301"},
    {"name": "Sableye", "generation": 1, "image": "302-sableye", "number": "#302"},
    {"name": "Mawile", "generation": 1, "image": "303-mawile", "number": "#303"},
    {"name": "Aron", "generation": 1, "image": "304-aron", "number": "#304"},
    {"name": "Lairon", "generation": 1, "image": "305-lairon", "number": "#305"},
    {"name": "Aggron", "generation": 1, "image": "306-aggron", "number": "#306"},
    {"name": "Meditite", "generation": 1, "image": "307-meditite", "number": "#307"},
    {"name": "Medicham", "generation": 1, "image": "308-medicham", "number": "#308"},
    {"name": "Electrike", "generation": 1, "image": "309-electrike", "number": "#309"},
    {"name": "Manectric", "generation": 1, "image": "310-manectric", "number": "#310"},
    {"name": "Plusle", "generation": 1, "image": "311-plusle", "number": "#311"},
    {"name": "Minun", "generation": 1, "image": "312-minun", "number": "#312"},
    {"name": "Volbeat", "generation": 1, "image": "313-volbeat", "number": "#313"},
    {"name": "Illumise", "generation": 1, "image": "314-illumise", "number": "#314"},
    {"name": "Roselia", "generation": 1, "image": "315-roselia", "number": "#315"},
    {"name": "Gulpin", "generation": 1, "image": "316-gulpin", "number": "#316"},
    {"name": "Swalot", "generation": 1, "image": "317-swalot", "number": "#317"},
    {"name": "Carvanha", "generation": 1, "image": "318-carvanha", "number": "#318"},
    {"name": "Sharpedo", "generation": 1, "image": "319-sharpedo", "number": "#319"},
    {"name": "Wailmer", "generation": 1, "image": "320-wailmer", "number": "#320"},
    {"name": "Wailord", "generation": 1, "image": "321-wailord", "number": "#321"},
    {"name": "Numel", "generation": 1, "image": "322-numel", "number": "#322"},
    {"name": "Camerupt", "generation": 1, "image": "323-camerupt", "number": "#323"},
    {"name": "Torkoal", "generation": 1, "image": "324-torkoal", "number": "#324"},
    {"name": "Spoink", "generation": 1, "image": "325-spoink", "number": "#325"},
    {"name": "Grumpig", "generation": 1, "image": "326-grumpig", "number": "#326"},
    {"name": "Spinda", "generation": 1, "image": "327-spinda-1", "number": "#327"},
    {"name": "Trapinch", "generation": 1, "image": "328-trapinch", "number": "#328"},
    {"name": "Vibrava", "generation": 1, "image": "329-vibrava", "number": "#329"},
    {"name": "Flygon", "generation": 1, "image": "330-flygon", "number": "#330"},
    {"name": "Cacnea", "generation": 1, "image": "331-cacnea", "number": "#331"},
    {"name": "Cacturne", "generation": 1, "image": "332-cacturne", "number": "#332"},
    {"name": "Swablu", "generation": 1, "image": "333-swablu", "number": "#333"},
    {"name": "Altaria", "generation": 1, "image": "334-altaria", "number": "#334"},
    {"name": "Zangoose", "generation": 1, "image": "335-zangoose", "number": "#335"},
    {"name": "Seviper", "generation": 1, "image": "336-seviper", "number": "#336"},
    {"name": "Lunatone", "generation": 1, "image": "337-lunatone", "number": "#337"},
    {"name": "Solrock", "generation": 1, "image": "338-solrock", "number": "#338"},
    {"name": "Barboach", "generation": 1, "image": "339-barboach", "number": "#339"},
    {"name": "Whiscash", "generation": 1, "image": "340-whiscash", "number": "#340"},
    {"name": "Corphish", "generation": 1, "image": "341-corphish", "number": "#341"},
    {"name": "Crawdaunt", "generation": 1, "image": "342-crawdaunt", "number": "#342"},
    {"name": "Baltoy", "generation": 1, "image": "343-baltov", "number": "#343"},
    {"name": "Claydol", "generation": 1, "image": "344-clavdol", "number": "#344"},
    {"name": "Lileep", "generation": 1, "image": "345-lileep", "number": "#345"},
    {"name": "Cradily", "generation": 1, "image": "346-cradily", "number": "#346"},
    {"name": "Anorith", "generation": 1, "image": "347-anorith", "number": "#347"},
    {"name": "Armaldo", "generation": 1, "image": "348-armaldo", "number": "#348"},
    {"name": "Feebas", "generation": 1, "image": "349-feebas", "number": "#349"},
    {"name": "Milotic", "generation": 1, "image": "350-milotic", "number": "#350"},
    {"name": "Castform", "generation": 1, "image": "351-castform-normal", "number": "#351"},
    {"name": "Castform", "generation": 1, "image": "351-castform-rainy", "number": "#351A"},
    {"name": "Castform", "generation": 1, "image": "351-castform-snowy", "number": "#351B"},
    {"name": "Castform", "generation": 1, "image": "351-castform-sunny", "number": "#351C"},
    {"name": "Kecleon", "generation": 1, "image": "352-kecleon", "number": "#352"},
    {"name": "Shuppet", "generation": 1, "image": "353-shuppet", "number": "#353"},
    {"name": "Banette", "generation": 1, "image": "354-banette", "number": "#354"},
    {"name": "Duskull", "generation": 1, "image": "355-duskull", "number": "#355"},
    {"name": "Dusclops", "generation": 1, "image": "356-dusclops", "number": "#356"},
    {"name": "Tropius", "generation": 1, "image": "357-tropius", "number": "#357"},
    {"name": "Chimecho", "generation": 1, "image": "358-chimecho", "number": "#358"},
    {"name": "Absol", "generation": 1, "image": "359-absol", "number": "#359"},
    {"name": "Wynaut", "generation": 1, "image": "360-wynaut", "number": "#360"},
    {"name": "Snorunt", "generation": 1, "image": "361-snorunt", "number": "#361"},
    {"name": "Glalie", "generation": 1, "image": "362-glalie", "number": "#362"},
    {"name": "Spheal", "generation": 1, "image": "363-spheal", "number": "#363"},
    {"name": "Sealeo", "generation": 1, "image": "364-sealeo", "number": "#364"},
    {"name": "Walrein", "generation": 1, "image": "365-walrein", "number": "#365"},
    {"name": "Clamperl", "generation": 1, "image": "366-clamperl", "number": "#366"},
    {"name": "Huntail", "generation": 1, "image": "367-huntail", "number": "#367"},
    {"name": "Gorebyss", "generation": 1, "image": "368-gorebyss", "number": "#368"},
    {"name": "Relicanth", "generation": 1, "image": "369-relicanth", "number": "#369"},
    {"name": "Luvdisc", "generation": 1, "image": "370-luvdisc", "number": "#370"},
    {"name": "Bagon", "generation": 1, "image": "371-bagon", "number": "#371"},
    {"name": "Shelgon", "generation": 1, "image": "372-shelgon", "number": "#372"},
    {"name": "Salamence", "generation": 1, "image": "373-salamence", "number": "#373"},
    {"name": "Beldum", "generation": 1, "image": "374-beldum", "number": "#374"},
    {"name": "Metang", "generation": 1, "image": "375-metang", "number": "#375"},
    {"name": "Metagross", "generation": 1, "image": "376-metagross", "number": "#376"},
    {"name": "Regirock", "generation": 1, "image": "377-regirock", "number": "#377"},
    {"name": "Regice", "generation": 1, "image": "378-regice", "number": "#378"},
    {"name": "Registeel", "generation": 1, "image": "379-registeel", "number": "#379"},
    {"name": "Latias", "generation": 1, "image": "380-latias", "number": "#380"},
    {"name": "Latios", "generation": 1, "image": "381-latios", "number": "#381"},
    {"name": "Kyogre", "generation": 1, "image": "382-kyogre", "number": "#382"},
    {"name": "Groudon", "generation": 1, "image": "383-groudon", "number": "#383"},
    {"name": "Rayquaza", "generation": 1, "image": "384-rayquaza", "number": "#384"},
    {"name": "Jirachi", "generation": 1, "image": "385-lirachi", "number": "#385"},
    {"name": "Deoxys", "generation": 1, "image": "386-deoxys", "number": "#386"},
    {"name": "Turtwig", "generation": 1, "image": "387-turtwig", "number": "#387"},
    {"name": "Grotle", "generation": 1, "image": "388-grotle", "number": "#388"},
    {"name": "Torterra", "generation": 1, "image": "389-torterra", "number": "#389"},
    {"name": "Chimchar", "generation": 1, "image": "390-chimchar", "number": "#390"},
    {"name": "Monferno", "generation": 1, "image": "391-monferno", "number": "#391"},
    {"name": "Infernape", "generation": 1, "image": "392-infernape", "number": "#392"},
    {"name": "Piplup", "generation": 1, "image": "393-piplup", "number": "#393"},
    {"name": "Prinplup", "generation": 1, "image": "394-prinplup", "number": "#394"},
    {"name": "Empoleon", "generation": 1, "image": "395-empoleon", "number": "#395"},
    {"name": "Starly", "generation": 1, "image": "396-starly", "number": "#396"},
    {"name": "Staravia", "generation": 1, "image": "397-staravia", "number": "#397"},
    {"name": "Staraptor", "generation": 1, "image": "398-staraptor", "number": "#398"},
    {"name": "Bidoof", "generation": 1, "image": "399-bidoof", "number": "#399"},
    {"name": "Bibarel", "generation": 1, "image": "400-bibarel", "number": "#400"},
    {"name": "Kricketot", "generation": 1, "image": "401-kricketot", "number": "#401"},
    {"name": "Kricketune", "generation": 1, "image": "402-kricketune", "number": "#402"},
    {"name": "Shinx", "generation": 1, "image": "403-shinx", "number": "#403"},
    {"name": "Luxio", "generation": 1, "image": "404-luxio", "number": "#404"},
    {"name": "Luxray", "generation": 1, "image": "405-luxray", "number": "#405"},
    {"name": "Budew", "generation": 1, "image": "406-budew", "number": "#406"},
    {"name": "Roserade", "generation": 1, "image": "407-roserade", "number": "#407"},
    {"name": "Cranidos", "generation": 1, "image": "408-cranidos", "number": "#408"},
    {"name": "Rampardos", "generation": 1, "image": "409-rampardos", "number": "#409"},
    {"name": "Shieldon", "generation": 1, "image": "410-shieldon", "number": "#410"},
    {"name": "Bastiodon", "generation": 1, "image": "411-bastiodon", "number": "#411"},
    {"name": "Burmy", "generation": 1, "image": "412-burmy-plant", "number": "#412A"},
    {"name": "Burmy", "generation": 1, "image": "412-burmy-sandy", "number": "#412B"},
    {"name": "Burmy", "generation": 1, "image": "412-burmy-trash", "number": "#412C"},
    {"name": "Wormadam", "generation": 1, "image": "413-wormadam-plant", "number": "#413A"},
    {"name": "Wormadam", "generation": 1, "image": "413-wormadam-sandy", "number": "#413B"},
    {"name": "Wormadam", "generation": 1, "image": "413-wormadam-trash", "number": "#413C"},
    {"name": "Mothim", "generation": 1, "image": "414-mothim", "number": "#414"},
    {"name": "Combee", "generation": 1, "image": "415-combee", "number": "#415"},
    {"name": "Vespiquen", "generation": 1, "image": "416-vespiqueen", "number": "#416"},
    {"name": "Pachirisu", "generation": 1, "image": "417-pachirisu", "number": "#417"},
    {"name": "Buizel", "generation": 1, "image": "418-buizel", "number": "#418"},
    {"name": "Floatzel", "generation": 1, "image": "419-floatzel", "number": "#419"},
    {"name": "Cherubi", "generation": 1, "image": "420-cherubi", "number": "#420"},
    {"name": "Cherrim", "generation": 1, "image": "421-cherim-overcast", "number": "#421"},
    {"name": "Shellos", "generation": 1, "image": "422-shellos-east", "number": "#422A"},
    {"name": "Shellos", "generation": 1, "image": "422-shellos-west", "number": "#422B"},
    {"name": "Gastrodon", "generation": 1, "image": "423-gastrodon-east", "number": "#423A"},
    {"name": "Gastrodon", "generation": 1, "image": "423-gastrodon-west", "number": "#423B"},
    {"name": "Ambipom", "generation": 1, "image": "424-ambipom", "number": "#424"},
    {"name": "Drifloon", "generation": 1, "image": "425-drifloon", "number": "#425"},
    {"name": "Drifblim", "generation": 1, "image": "426-drifblim", "number": "#426"},
    {"name": "Buneary", "generation": 1, "image": "427-buneary", "number": "#427"},
    {"name": "Lopunny", "generation": 1, "image": "428-lopunny", "number": "#428"},
    {"name": "Mismagius", "generation": 1, "image": "429-mismagius", "number": "#429"},
    {"name": "Honchkrow", "generation": 1, "image": "430-honchkrow", "number": "#430"},
    {"name": "Glameow", "generation": 1, "image": "431-glameow", "number": "#431"},
    {"name": "Purugly", "generation": 1, "image": "432-purugly", "number": "#432"},
    {"name": "Chingling", "generation": 1, "image": "433-chingling", "number": "#433"},
    {"name": "Stunky", "generation": 1, "image": "434-stunky", "number": "#434"},
    {"name": "Skuntank", "generation": 1, "image": "435-skuntank", "number": "#435"},
    {"name": "Bronzor", "generation": 1, "image": "436-bronzor", "number": "#436"},
    {"name": "Bronzong", "generation": 1, "image": "437-bronzong", "number": "#437"},
    {"name": "Bonsly", "generation": 1, "image": "438-bonsly", "number": "#438"},
    {"name": "Mime Jr.", "generation": 1, "image": "439-mimejr", "number": "#439"},
    {"name": "Happiny", "generation": 1, "image": "440-happiny", "number": "#440"},
    {"name": "Chatot", "generation": 1, "image": "441-chatot", "number": "#441"},
    {"name": "Spiritomb", "generation": 1, "image": "442-spiritomb", "number": "#442"},
    {"name": "Gible", "generation": 1, "image": "443-gible", "number": "#443"},
    {"name": "Gabite", "generation": 1, "image": "444-gabite", "number": "#444"},
    {"name": "Garchomp", "generation": 1, "image": "445-garchomp", "number": "#445"},
    {"name": "Munchlax", "generation": 1, "image": "446-munchlax", "number": "#446"},
    {"name": "Riolu", "generation": 1, "image": "447-riolu", "number": "#447"},
    {"name": "Lucario", "generation": 1, "image": "448-lucario", "number": "#448"},
    {"name": "Hippopotas", "generation": 1, "image": "449-hippopotas", "number": "#449"},
    {"name": "Hippowdon", "generation": 1, "image": "450-hippowdon", "number": "#450"},
    {"name": "Skorupi", "generation": 1, "image": "451-skorupi", "number": "#451"},
    {"name": "Drapion", "generation": 1, "image": "452-drapion","number": "#452"},
    {"name": "Carnivine", "generation": 1, "image": "455-carnivine","number": "#455"},
    {"name": "Giratina", "generation": 1, "image": "487-giratina-altered", "number": "#487"}
  ];

  constructor(
    public geo: GeoProvider,
    public geolocation: Geolocation,
    public navCtrl: NavController,
    private changeDetector: ChangeDetectorRef,
    private zone: NgZone
  ) {
    this.geo.isLocatorActive.subscribe(res => {
      this.isLocatorActive = res;
      this.location = this.geo.getLocation();
    })
  }

  ngAfterViewInit() {
    if(this.isLocatorActive) {
      this.location.subscribe(res => {
        if(res.lat === null){
          return false;
        }
        this.makeMap(res.lat, res.lon);
        this.setIterables();
      })
    }
  }

  typeChanged(type) {
    if(type == 1) {
      this.placeMarkers(this.nearbyRaids);
    }
    if(type == 2) {
      this.placeMarkers(this.nearbyQuests);
    }
  }

  displayPokemon(number) {
    return this.pokeman.find(x => x.number == "#" + number);
  }

  goToRaidPage(raid, info) {
    this.navCtrl.push(RaidPage, {"raid": raid, 'info': info});
  }

  makeMap(lat, lon) {
    let mapOptions: GoogleMapOptions = {
      camera: {
          target: {
            lat: lat,
            lng: lon
          },
          zoom: 14
        }
    };

    this.map = GoogleMaps.create('map', mapOptions);
  }

  setIterables() {
    if(this.geo.isLocatorActive) {
      let locator = this.geo.getLocation();
      locator.subscribe(loc => {
        let raids = this.geo.getNearbyRaids(loc.lat, loc.lon);
        let quests = this.geo.getNearbyQuests(loc.lat, loc.lon);
        // let trades = this.geo.getNearbyTrades(loc.lat, loc.lon);

        raids.subscribe(res => {
          this.nearbyRaids = res;
          this.nearbyIterables = this.nearbyRaids;
          this.placeMarkers(this.nearbyIterables);
          console.log('raids is');
          console.log(res);
        });
        

        quests.subscribe(res => {
          this.nearbyQuests = res;
          console.log('quests is');
          console.log(res);
        });
    
        // trades.subscribe(res => {
        //   this.nearbyTrades = res;
        // });
      })
    }
  }

  placeMarkers(it) {
    this.map.clear();

    this.nearbyIterables = [];
    this.nearbyIterables = it;

    this.nearbyIterables.forEach(i => {
      let lat = i.pos.geopoint.latitude;
      let lon = i.pos.geopoint.longitude;

      let marker: Marker = this.map.addMarkerSync({
        title: i.d,
        icon: 'blue',
        position: {
          lat: lat,
          lng: lon
        }
      });
      
      // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      //   alert('clicked');
      // });
    });
  }

  getLocation() {
    return this.geolocation.getCurrentPosition();
  }

  openAddQuestPage() {
    this.navCtrl.push(AddQuestPage);
  }

  openAddModalPage() {
    this.navCtrl.push(AddRaidPage);
  }

  openAddTradePage() {
    this.navCtrl.push(AddTradePage);
  }

  getCeilDistance(num) {
    return Math.ceil(num);
  }

}
