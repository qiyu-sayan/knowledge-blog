/* 随机地址生成器 — 多国真实街道 / 公开地标 */
(function () {
  const STREETS = {
    us: {
      label: "美国",
      first: ["James","Mary","John","Patricia","Robert","Jennifer","Michael","Linda","David","Elizabeth","William","Barbara","Richard","Susan","Joseph","Jessica"],
      last: ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Martinez","Wilson","Anderson","Taylor","Thomas","Moore","Jackson","Martin"],
      emailDomain: ["gmail.com","yahoo.com","outlook.com"],
      cities: [
        { city: "New York", state: "NY", zip: "10001", streets: ["Broadway","5th Avenue","Madison Avenue","Park Avenue","Lexington Avenue","W 34th Street","Canal Street","Wall Street","Atlantic Avenue","Queens Boulevard"] },
        { city: "Los Angeles", state: "CA", zip: "90001", streets: ["Sunset Boulevard","Wilshire Boulevard","Hollywood Boulevard","Santa Monica Boulevard","Figueroa Street","Venice Boulevard","La Brea Avenue"] },
        { city: "Chicago", state: "IL", zip: "60601", streets: ["Michigan Avenue","State Street","Lake Shore Drive","Halsted Street","Madison Street","Archer Avenue","Western Avenue"] },
        { city: "Houston", state: "TX", zip: "77001", streets: ["Main Street","Westheimer Road","Bissonnet Street","Memorial Drive","Smith Street","Fannin Street"] },
        { city: "San Francisco", state: "CA", zip: "94101", streets: ["Market Street","Mission Street","Van Ness Avenue","Geary Boulevard","California Street","Valencia Street"] },
        { city: "Boston", state: "MA", zip: "02101", streets: ["Beacon Street","Boylston Street","Newbury Street","Washington Street","Commonwealth Avenue","Atlantic Avenue"] },
        { city: "Seattle", state: "WA", zip: "98101", streets: ["Pike Street","Pine Street","Denny Way","Broadway","Rainier Avenue","Market Street"] },
        { city: "Miami", state: "FL", zip: "33101", streets: ["Biscayne Boulevard","Brickell Avenue","Collins Avenue","Ocean Drive","Flagler Street"] }
      ]
    },
    uk: {
      label: "英国",
      first: ["Oliver","Olivia","George","Amelia","Harry","Isla","Jack","Ava","Jacob","Emily","Noah","Sophia","Thomas","Mia"],
      last: ["Smith","Jones","Williams","Taylor","Brown","Davies","Wilson","Evans","Thomas","Roberts","Johnson","Lewis","Walker","Wood"],
      emailDomain: ["gmail.com","outlook.com","yahoo.co.uk"],
      cities: [
        { city: "London", region: "England", zip: "SW1A 1AA", streets: ["Oxford Street","Regent Street","Piccadilly","The Strand","Baker Street","King's Road","Bishopsgate","Waterloo Road","Edgware Road","Whitehall"] },
        { city: "Manchester", region: "England", zip: "M1 1AE", streets: ["Deansgate","Oxford Road","Piccadilly Gardens","King Street","London Road","Wilmslow Road"] },
        { city: "Birmingham", region: "England", zip: "B1 1BB", streets: ["New Street","High Street","Broad Street","Corporation Street","Hagley Road","Bristol Road"] },
        { city: "Edinburgh", region: "Scotland", zip: "EH1 1YZ", streets: ["Princes Street","Royal Mile","George Street","Leith Walk","Lothian Road"] },
        { city: "Glasgow", region: "Scotland", zip: "G1 1XQ", streets: ["Buchanan Street","Argyle Street","Sauchiehall Street","Byres Road","Great Western Road"] }
      ]
    },
    cn: {
      label: "中国",
      first: ["伟","芳","娜","敏","静","丽","强","磊","军","洋","勇","艳","杰","娟","涛","明"],
      last: ["王","李","张","刘","陈","杨","黄","赵","周","吴","徐","孙","马","朱","胡","郭"],
      emailDomain: ["qq.com","163.com","gmail.com"],
      cities: [
        { city: "上海市", prov: "上海", zip: "200000", district: "黄浦区", streets: ["南京东路","南京西路","淮海中路","人民大道","延安东路","世纪大道","北京东路"] },
        { city: "北京市", prov: "北京", zip: "100000", district: "东城区", streets: ["长安街","王府井大街","东单北大街","朝阳门内大街","安定门内大街","景山前街"] },
        { city: "广州市", prov: "广东", zip: "510000", district: "越秀区", streets: ["中山五路","北京路","人民中路","解放南路","东风中路","天河路"] },
        { city: "深圳市", prov: "广东", zip: "518000", district: "福田区", streets: ["深南大道","红荔路","彩田路","福华路","滨河大道","人民南路"] },
        { city: "杭州市", prov: "浙江", zip: "310000", district: "上城区", streets: ["延安路","解放路","庆春路","凤起路","文三路","湖滨路"] },
        { city: "成都市", prov: "四川", zip: "610000", district: "青羊区", streets: ["人民中路","天府大道","红星路","春熙路","建设路"] },
        { city: "武汉市", prov: "湖北", zip: "430000", district: "江汉区", streets: ["中山大道","江汉路","解放大道","建设大道","中南路"] },
        { city: "西安市", prov: "陕西", zip: "710000", district: "碑林区", streets: ["长安中路","雁塔西路","小寨东路","东大街","南大街"] }
      ]
    },
    de: {
      label: "德国",
      first: ["Hans","Anna","Peter","Maria","Thomas","Julia","Michael","Sabine","Stefan","Lisa","Andreas","Katharina","Christian","Laura","Markus","Julia"],
      last: ["Müller","Schmidt","Schneider","Fischer","Weber","Meyer","Wagner","Becker","Schulz","Hoffmann","Koch","Richter","Klein","Wolf","Schröder","Neumann"],
      emailDomain: ["gmail.com","web.de","gmx.de","outlook.de"],
      cities: [
        { city: "Berlin", state: "Berlin", zip: "10117", streets: ["Unter den Linden","Friedrichstraße","Kurfürstendamm","Potsdamer Straße","Alexanderstraße","Torstraße","Karl-Marx-Allee","Schönhauser Allee"] },
        { city: "München", state: "Bayern", zip: "80331", streets: ["Kaufingerstraße","Neuhauser Straße","Leopoldstraße","Schleißheimer Straße","Lindwurmstraße","Sonnenstraße"] },
        { city: "Hamburg", state: "Hamburg", zip: "20095", streets: ["Mönckebergstraße","Jungfernstieg","Reeperbahn","Alsterufer","Hafenstraße","Landungsbrücken"] },
        { city: "Köln", state: "Nordrhein-Westfalen", zip: "50667", streets: ["Hohe Straße","Ehrenstraße","Hohenzollernring","Deutz-Mülheimer Straße","Venloer Straße"] },
        { city: "Frankfurt am Main", state: "Hessen", zip: "60311", streets: ["Zeil","Berliner Straße","Hauptwache","Konrad-Adenauer-Straße","Hanauer Landstraße"] }
      ]
    },
    fr: {
      label: "法国",
      first: ["Jean","Marie","Pierre","Sophie","Louis","Camille","Antoine","Emma","Nicolas","Julie","François","Claire","Philippe","Céline","Thomas","Léa"],
      last: ["Martin","Bernard","Dubois","Thomas","Robert","Richard","Petit","Durand","Leroy","Moreau","Simon","Laurent","Lefebvre","Michel","Garcia","David"],
      emailDomain: ["gmail.com","orange.fr","free.fr","outlook.fr"],
      cities: [
        { city: "Paris", region: "Île-de-France", zip: "75001", streets: ["Rue de Rivoli","Boulevard Saint-Germain","Avenue des Champs-Élysées","Rue de Vaugirard","Boulevard Haussmann","Rue du Faubourg Saint-Honoré","Rue Saint-Martin"] },
        { city: "Lyon", region: "Auvergne-Rhône-Alpes", zip: "69001", streets: ["Rue de la République","Cours Gambetta","Rue Victor Hugo","Rue Mercière","Avenue Jean Jaurès"] },
        { city: "Marseille", region: "Provence-Alpes-Côte d'Azur", zip: "13001", streets: ["La Canebière","Rue Saint-Ferréol","Cours Julien","Rue de Rome","Avenue du Prado"] }
      ]
    },
    jp: {
      label: "日本",
      first: ["太郎","花子","健","美咲","翔","陽菜","大輔","結衣","拓也","葵","直樹","さくら","悠","凛","翼","美羽"],
      last: ["佐藤","鈴木","高橋","田中","伊藤","渡辺","山本","中村","小林","加藤","吉田","山田","佐々木","山口","松本","井上"],
      emailDomain: ["gmail.com","yahoo.co.jp","outlook.jp"],
      cities: [
        { city: "東京都", prov: "東京", zip: "100-0001", district: "千代田区", streets: ["丸の内一丁目","銀座四丁目","本町三丁目","日比谷公園","有楽町一丁目","大手町一丁目"] },
        { city: "大阪市", prov: "大阪", zip: "530-0001", district: "北区", streets: ["梅田一丁目","本町二丁目","心斎橋筋一丁目","難波三丁目","天神橋一丁目"] },
        { city: "名古屋市", prov: "愛知", zip: "460-0001", district: "中区", streets: ["栄三丁目","本町三丁目","大須一丁目","名駅三丁目","納屋橋一丁目"] },
        { city: "札幌市", prov: "北海道", zip: "060-0001", district: "中央区", streets: ["北一条西二丁目","南一丁目西二丁目","大通西五丁目"] }
      ]
    },
    au: {
      label: "澳大利亚",
      first: ["Jack","Olivia","Noah","Charlotte","William","Amelia","James","Isla","Oliver","Mia","Thomas","Ava","Lucas","Grace","Ethan","Sophia"],
      last: ["Smith","Jones","Williams","Brown","Wilson","Taylor","Johnson","White","Martin","Anderson","Thompson","Moore","Harris","Clark","Lewis","Walker"],
      emailDomain: ["gmail.com","outlook.com","bigpond.com"],
      cities: [
        { city: "Sydney", state: "NSW", zip: "2000", streets: ["George Street","Pitt Street","Oxford Street","King Street","Elizabeth Street","George Street","Park Street"] },
        { city: "Melbourne", state: "VIC", zip: "3000", streets: ["Collins Street","Bourke Street","Flinders Street","Swanston Street","Elizabeth Street","Chapel Street"] },
        { city: "Brisbane", state: "QLD", zip: "4000", streets: ["Queen Street","George Street","Adelaide Street","Eagle Street","Ann Street"] },
        { city: "Perth", state: "WA", zip: "6000", streets: ["St Georges Terrace","Hay Street","Murray Street","Wellington Street","William Street"] }
      ]
    },
    ca: {
      label: "加拿大",
      first: ["Liam","Olivia","Noah","Emma","William","Sophia","James","Ava","Oliver","Isabella","Benjamin","Mia","Ethan","Charlotte","Lucas","Amelia"],
      last: ["Smith","Brown","Tremblay","Martin","Roy","Wilson","MacDonald","Gagnon","Johnson","Taylor","Campbell","Lee","Williams","Miller","Davis","Moore"],
      emailDomain: ["gmail.com","outlook.com","yahoo.ca"],
      cities: [
        { city: "Toronto", state: "ON", zip: "M5H 2N2", streets: ["Yonge Street","Queen Street West","Bloor Street","King Street","Dundas Street","Front Street"] },
        { city: "Vancouver", state: "BC", zip: "V6B 1A1", streets: ["Robson Street","Granville Street","Georgia Street","Main Street","Broadway","Cambie Street"] },
        { city: "Montreal", state: "QC", zip: "H2X 1Y4", streets: ["Rue Sainte-Catherine","Boulevard Saint-Laurent","Rue Sherbrooke","Avenue Mont-Royal","Rue Saint-Denis"] },
        { city: "Ottawa", state: "ON", zip: "K1P 5Y2", streets: ["Rideau Street","Bank Street","Elgin Street","Wellington Street","Carling Avenue"] }
      ]
    },
    sg: {
      label: "新加坡",
      first: ["Wei Ming","Jia Ling","Hui Min","Wei Jie","Xin Yi","Jun Wei","Yi Ling","Wei Hao","Jia Wei","Pei Ling","Zhi Hao","Yu Xuan","Tian Wei","Jing Hui","Kai Xin","Rui Jia"],
      last: ["Tan","Lim","Lee","Ng","Ong","Wong","Goh","Chua","Koh","Teo","Sim","Chong","Yeo","Toh","Low","Pang"],
      emailDomain: ["gmail.com","outlook.com","yahoo.com.sg"],
      cities: [
        { city: "Singapore", region: "Central", zip: "049315", streets: ["Orchard Road","Raffles Avenue","Beach Road","Serangoon Road","Victoria Street","Bugis Street","Shenton Way"] },
        { city: "Singapore", region: "East", zip: "428000", streets: ["Changi Road","Eunos Road","Paya Lebar Road","Tanjong Katong Road","East Coast Road"] }
      ]
    },
    in: {
      label: "印度",
      first: ["Aarav","Ananya","Vihaan","Diya","Arjun","Aadhya","Kabir","Ishita","Rohan","Meera","Aditya","Kavya","Karan","Priya","Rahul","Sneha"],
      last: ["Sharma","Verma","Gupta","Singh","Mehta","Joshi","Patel","Reddy","Kapoor","Malhotra","Chopra","Nair","Iyer","Khan","Das","Bose"],
      emailDomain: ["gmail.com","yahoo.co.in","outlook.com"],
      cities: [
        { city: "Mumbai", state: "Maharashtra", zip: "400001", streets: ["MG Road","Linking Road","Hill Road","SV Road","Marine Drive","Hornby Road"] },
        { city: "New Delhi", state: "Delhi", zip: "110001", streets: ["Connaught Place","Rajpath","Barakhamba Road","Janpath","Kasturba Gandhi Marg"] },
        { city: "Bengaluru", state: "Karnataka", zip: "560001", streets: ["MG Road","Brigade Road","Church Street","Indiranagar 100 Feet Road","Residency Road"] },
        { city: "Chennai", state: "Tamil Nadu", zip: "600001", streets: ["Anna Salai","Mount Road","T. Nagar","Marina Beach Road","Pycrofts Road"] }
      ]
    },
    kr: {
      label: "韩国",
      first: ["민준","서연","지호","하윤","예준","서현","도윤","지우","주원","수아","시우","하은","준서","지아","건우","윤서"],
      last: ["김","이","박","최","정","강","조","윤","장","임","한","오","서","신","권","황"],
      emailDomain: ["gmail.com","naver.com","daum.net"],
      cities: [
        { city: "서울특별시", prov: "서울", zip: "04524", district: "중구", streets: ["세종대로","을지로","퇴계로","충무로","무교로","소공동"] },
        { city: "부산광역시", prov: "부산", zip: "48938", district: "중구", streets: ["중앙대로","자갈치로","광복로","부산진구 중앙대로"] },
        { city: "인천광역시", prov: "인천", zip: "22332", district: "중구", streets: ["인천대로","중구 차이나타운로","공항로"] }
      ]
    },
    br: {
      label: "巴西",
      first: ["Miguel","Helena","Arthur","Alice","Davi","Laura","Bernardo","Valentina","Heitor","Sophia","Lorenzo","Isabella","Théo","Manuela","Pedro","Júlia"],
      last: ["Silva","Santos","Oliveira","Souza","Rodrigues","Ferreira","Alves","Pereira","Lima","Gomes","Costa","Ribeiro","Martins","Carvalho","Almeida","Lopes"],
      emailDomain: ["gmail.com","outlook.com","uol.com.br"],
      cities: [
        { city: "São Paulo", state: "SP", zip: "01310-100", streets: ["Avenida Paulista","Rua Augusta","Avenida Faria Lima","Rua Oscar Freire","Avenida Rebouças"] },
        { city: "Rio de Janeiro", state: "RJ", zip: "20031-170", streets: ["Avenida Atlântica","Rua Visconde de Pirajá","Avenida Rio Branco","Rua das Laranjeiras"] }
      ]
    },
    it: {
      label: "意大利",
      first: ["Alessandro","Giulia","Lorenzo","Sofia","Andrea","Aurora","Matteo","Giorgia","Francesco","Martina","Davide","Chiara","Leonardo","Sara","Marco","Elena"],
      last: ["Rossi","Russo","Ferrari","Esposito","Bianchi","Romano","Colombo","Ricci","Marino","Greco","Bruno","Gallo","Conti","De Luca","Mancini","Costa"],
      emailDomain: ["gmail.com","libero.it","outlook.it"],
      cities: [
        { city: "Roma", state: "Lazio", zip: "00186", streets: ["Via del Corso","Via dei Fori Imperiali","Via Veneto","Via Nazionale","Piazza di Spagna"] },
        { city: "Milano", state: "Lombardia", zip: "20121", streets: ["Via Montenapoleone","Corso Buenos Aires","Via Torino","Via Dante","Foro Buonaparte"] },
        { city: "Firenze", state: "Toscana", zip: "50122", streets: ["Via de' Tornabuoni","Via Roma","Via Calimala","Via Guelfa"] }
      ]
    },
    es: {
      label: "西班牙",
      first: ["Hugo","Lucía","Martín","María","Pablo","Paula","Daniel","Sofía","Alejandro","Valentina","Adriana","Lucas","Alba","Álvaro","Carla","Javier"],
      last: ["García","Rodríguez","González","Fernández","López","Martínez","Sánchez","Pérez","Gómez","Martín","Jiménez","Ruiz","Hernández","Díaz","Moreno","Álvarez"],
      emailDomain: ["gmail.com","outlook.es","hotmail.es"],
      cities: [
        { city: "Madrid", state: "Madrid", zip: "28013", streets: ["Gran Vía","Calle de Alcalá","Calle de Serrano","Calle de Fuencarral","Paseo de la Castellana"] },
        { city: "Barcelona", state: "Cataluña", zip: "08002", streets: ["La Rambla","Passeig de Gràcia","Avinguda Diagonal","Carrer de Balmes","Ronda de la Universitat"] },
        { city: "Valencia", state: "Comunidad Valenciana", zip: "46001", streets: ["Calle de Colón","Avenida del Oest","Calle de la Paz"] }
      ]
    },
    nl: {
      label: "荷兰",
      first: ["Daan","Emma","Sem","Tess","Luuk","Julia","Finn","Sanne","Levi","Lotte","Bram","Fleur","Mees","Isa","Thijs","Nora"],
      last: ["De Jong","Jansen","De Vries","Van den Berg","Van Dijk","Bakker","Janssen","Visser","Smit","Meijer","De Boer","Mulder","De Groot","Bos","Vos","Peters"],
      emailDomain: ["gmail.com","outlook.nl","hotmail.nl"],
      cities: [
        { city: "Amsterdam", state: "Noord-Holland", zip: "1012", streets: ["Damrak","Kalverstraat","Leidsestraat","Prinsengracht","Vijzelstraat"] },
        { city: "Rotterdam", state: "Zuid-Holland", zip: "3011", streets: ["Coolsingel","Lijnbaan","Nieuwe Binnenweg","Witte de Withstraat"] },
        { city: "Utrecht", state: "Utrecht", zip: "3511", streets: ["Vredenburg","Neudeflat","Oudegracht","Twijnstraat"] }
      ]
    }
  };

  const LANDMARKS = {
    us: [
      { name: "Boston City Hall", address: "1 City Hall Square", city: "Boston", state: "MA", zip: "02201" },
      { name: "New York Public Library", address: "476 5th Ave", city: "New York", state: "NY", zip: "10018" },
      { name: "San Francisco City Hall", address: "1 Dr Carlton B Goodlett Pl", city: "San Francisco", state: "CA", zip: "94102" },
      { name: "Chicago City Hall", address: "121 N LaSalle St", city: "Chicago", state: "IL", zip: "60602" },
      { name: "Los Angeles City Hall", address: "200 N Spring St", city: "Los Angeles", state: "CA", zip: "90012" },
      { name: "Houston City Hall", address: "901 Bagby St", city: "Houston", state: "TX", zip: "77002" }
    ],
    uk: [
      { name: "British Library", address: "96 Euston Road", city: "London", region: "England", zip: "NW1 2DB" },
      { name: "City of London Guildhall", address: "Gresham Street", city: "London", region: "England", zip: "EC2V 7HH" },
      { name: "Manchester Town Hall", address: "Albert Square", city: "Manchester", region: "England", zip: "M2 5DB" },
      { name: "University of Oxford", address: "Wellington Square", city: "Oxford", region: "England", zip: "OX1 2JD" },
      { name: "Edinburgh City Chambers", address: "High Street", city: "Edinburgh", region: "Scotland", zip: "EH1 1YJ" }
    ],
    cn: [
      { name: "上海市人民政府", address: "人民大道200号", city: "上海市", prov: "上海", zip: "200000", district: "黄浦区" },
      { name: "国家图书馆", address: "中关村南大街33号", city: "北京市", prov: "北京", zip: "100081", district: "海淀区" },
      { name: "广州市人民政府", address: "府前路1号", city: "广州市", prov: "广东", zip: "510032", district: "越秀区" },
      { name: "深圳市市民中心", address: "福中三路", city: "深圳市", prov: "广东", zip: "518000", district: "福田区" },
      { name: "浙江大学玉泉校区", address: "浙大路38号", city: "杭州市", prov: "浙江", zip: "310027", district: "西湖区" },
      { name: "武汉大学", address: "八一路299号", city: "武汉市", prov: "湖北", zip: "430072", district: "武昌区" }
    ],
    de: [
      { name: "Brandenburg Gate", address: "Pariser Platz", city: "Berlin", state: "Berlin", zip: "10117" },
      { name: "Rathaus Berlin", address: "Rathausstraße 15", city: "Berlin", state: "Berlin", zip: "10178" },
      { name: "Neues Rathaus München", address: "Marienplatz 8", city: "München", state: "Bayern", zip: "80331" },
      { name: "Hamburger Rathaus", address: "Rathausmarkt 1", city: "Hamburg", state: "Hamburg", zip: "20095" }
    ],
    fr: [
      { name: "Hôtel de Ville de Paris", address: "Place de l'Hôtel-de-Ville", city: "Paris", region: "Île-de-France", zip: "75004" },
      { name: "Bibliothèque nationale de France", address: "Quai François Mauriac", city: "Paris", region: "Île-de-France", zip: "75013" },
      { name: "Mairie de Lyon", address: "Place de la Comédie", city: "Lyon", region: "Auvergne-Rhône-Alpes", zip: "69001" }
    ],
    jp: [
      { name: "東京都庁舎", address: "新宿2丁目8番1号", city: "東京都", prov: "東京", zip: "163-8001", district: "新宿区" },
      { name: "大阪市役所", address: "大手前2丁目1番22号", city: "大阪市", prov: "大阪", zip: "540-0041", district: "中央区" },
      { name: "名古屋市役所", address: "三の丸3丁目1番1号", city: "名古屋市", prov: "愛知", zip: "460-8508", district: "中区" }
    ],
    au: [
      { name: "Sydney Town Hall", address: "483 George Street", city: "Sydney", state: "NSW", zip: "2000" },
      { name: "Melbourne Town Hall", address: "90-130 Swanston Street", city: "Melbourne", state: "VIC", zip: "3000" },
      { name: "Brisbane City Hall", address: "64 Adelaide Street", city: "Brisbane", state: "QLD", zip: "4000" }
    ],
    ca: [
      { name: "Toronto City Hall", address: "100 Queen Street West", city: "Toronto", state: "ON", zip: "M5H 2N2" },
      { name: "Vancouver City Hall", address: "453 West 12th Avenue", city: "Vancouver", state: "BC", zip: "V5Y 1V4" },
      { name: "Montreal City Hall", address: "275 Rue Notre-Dame Est", city: "Montreal", state: "QC", zip: "H2Y 1C6" }
    ],
    sg: [
      { name: "National Library Singapore", address: "100 Victoria Street", city: "Singapore", region: "Central", zip: "188064" },
      { name: "Singapore City Hall", address: "3 St Andrew's Road", city: "Singapore", region: "Central", zip: "178958" }
    ],
    in: [
      { name: "Brihanmumbai Municipal Corporation", address: "CST Road, Fort", city: "Mumbai", state: "Maharashtra", zip: "400001" },
      { name: "New Delhi Municipal Council", address: "Palika Kendra, Sansad Marg", city: "New Delhi", state: "Delhi", zip: "110001" },
      { name: "Bengaluru City Corporation", address: "N.R. Square", city: "Bengaluru", state: "Karnataka", zip: "560002" }
    ],
    kr: [
      { name: "서울시청", address: "세종대로 110", city: "서울특별시", prov: "서울", zip: "04524", district: "중구" },
      { name: "국립중앙도서관", address: "반포대로 201", city: "서울특별시", prov: "서울", zip: "06579", district: "서초구" }
    ],
    br: [
      { name: "Prefeitura de São Paulo", address: "Viaduto do Chá, 15", city: "São Paulo", state: "SP", zip: "01201-010" },
      { name: "Prefeitura do Rio de Janeiro", address: "Praça Mahatma Gandhi, 1", city: "Rio de Janeiro", state: "RJ", zip: "20060-120" }
    ],
    it: [
      { name: "Municipio di Roma", address: "Piazza del Campidoglio 1", city: "Roma", state: "Lazio", zip: "00186" },
      { name: "Comune di Milano", address: "Piazza del Duomo 2", city: "Milano", state: "Lombardia", zip: "20121" },
      { name: "Comune di Firenze", address: "Piazza della Signoria 1", city: "Firenze", state: "Toscana", zip: "50122" }
    ],
    es: [
      { name: "Ayuntamiento de Madrid", address: "Plaza de la Villa 1", city: "Madrid", state: "Madrid", zip: "28005" },
      { name: "Ajuntament de Barcelona", address: "Plaça de Sant Jaume 1", city: "Barcelona", state: "Cataluña", zip: "08002" }
    ],
    nl: [
      { name: "Paleis op de Dam", address: "Dam 1", city: "Amsterdam", state: "Noord-Holland", zip: "1012" },
      { name: "Stadhuis Rotterdam", address: "Coolsingel 40", city: "Rotterdam", state: "Zuid-Holland", zip: "3011" }
    ]
  };

  let region = "us";

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function randInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  function formatStreet(data, item) {
    const wantName = document.getElementById("withName").checked;
    const house = randInt(1, 3998);
    const street = pick(item.streets);

    if (region === "cn" || region === "jp" || region === "kr") {
      const num = region === "jp" ? `${randInt(1, 20)}丁目${randInt(1, 20)}番${randInt(1, 15)}号` : `${house}号`;
      const out = {
        地址: region === "jp" ? `${street}${num}` : `${street}${num}`,
        城市: item.city
      };
      if (item.prov) out["省市"] = item.prov + (item.district ? " · " + item.district : "");
      if (item.district && region !== "jp") out["区县"] = item.district;
      out["邮编"] = item.zip;
      if (wantName) out["示例姓名"] = pick(data.last) + pick(data.first);
      return out;
    }

    const line = `${house} ${street}`;
    const out = {};
    if (wantName) out.Name = `${pick(data.first)} ${pick(data.last)}`;
    out.Street = line;
    out.City = item.city;
    if (region === "uk") {
      out.County = item.region;
      out.Postcode = item.zip;
    } else if (region === "us" || region === "au" || region === "ca" || region === "in" || region === "br" || region === "it" || region === "es") {
      if (item.state) out.State = item.state;
      out[region === "us" || region === "ca" || region === "au" ? "ZIP" : "Postal"] = item.zip;
    } else if (region === "de") {
      out.State = item.state;
      out.PLZ = item.zip;
    } else if (region === "fr") {
      out.Region = item.region;
      out["Code postal"] = item.zip;
    } else if (region === "nl") {
      out.Province = item.state;
      out.Postcode = item.zip;
    } else if (region === "sg") {
      out.Area = item.region;
      out.Postal = item.zip;
    } else {
      if (item.state) out.State = item.state;
      out.Postal = item.zip;
    }
    return out;
  }

  function formatLandmark(item) {
    const wantName = document.getElementById("withName").checked;
    const data = STREETS[region];
    const out = { 名称: item.name, 地址: item.address, 城市: item.city };
    if (item.prov) out["省市"] = item.prov;
    if (item.district) out["区县"] = item.district;
    if (item.state) out["州/省"] = item.state;
    if (item.region) out["地区"] = item.region;
    out["邮编"] = item.zip;
    if (wantName) {
      out["示例姓名"] = region === "cn" || region === "jp" || region === "kr"
        ? pick(data.last) + pick(data.first)
        : `${pick(data.first)} ${pick(data.last)}`;
    }
    return out;
  }

  function generateOne() {
    const mode = document.getElementById("mode").value;
    const data = STREETS[region];
    if (mode === "landmark") return formatLandmark(pick(LANDMARKS[region]));
    return formatStreet(data, pick(data.cities));
  }

  function fillCountries() {
    const sel = document.getElementById("country");
    if (!sel) return;
    sel.innerHTML = "";
    Object.keys(STREETS).forEach((k) => {
      const o = document.createElement("option");
      o.value = k;
      o.textContent = STREETS[k].label;
      if (k === region) o.selected = true;
      sel.appendChild(o);
    });
  }

  function render() {
    const n = Math.max(1, Math.min(50, parseInt(document.getElementById("count").value, 10) || 8));
    const mode = document.getElementById("mode").value;
    const data = STREETS[region];
    const pool = mode === "landmark" ? LANDMARKS[region] : data.cities;
    const streetCount = mode === "street" ? data.cities.reduce((s, c) => s + c.streets.length, 0) : 0;
    document.getElementById("stat").textContent =
      mode === "street"
        ? `${data.label}：${data.cities.length} 城 × 约 ${streetCount} 条真实路名；门牌示意随机。`
        : `${data.label}：${pool.length} 处公开地标地址。`;

    const list = document.getElementById("list");
    list.innerHTML = "";
    const frag = document.createDocumentFragment();
    for (let i = 0; i < n; i++) {
      const rec = generateOne();
      const card = document.createElement("div");
      card.className = "addr-card";
      const h = document.createElement("h3");
      h.textContent = `#${i + 1}`;
      card.appendChild(h);
      const row = document.createElement("div");
      row.className = "addr-row";
      Object.keys(rec).forEach((k) => {
        const a = document.createElement("div");
        a.className = "addr-k";
        a.textContent = k;
        const b = document.createElement("div");
        b.className = "addr-v";
        b.textContent = rec[k];
        row.appendChild(a);
        row.appendChild(b);
      });
      card.appendChild(row);
      const act = document.createElement("div");
      act.className = "addr-actions";
      const copyBtn = document.createElement("button");
      copyBtn.className = "btn";
      copyBtn.textContent = "复制本条";
      copyBtn.onclick = () => {
        const text = Object.entries(rec).map(([k, v]) => `${k}: ${v}`).join("\n");
        navigator.clipboard.writeText(text);
        copyBtn.textContent = "已复制";
        setTimeout(() => (copyBtn.textContent = "复制本条"), 1200);
      };
      act.appendChild(copyBtn);
      card.appendChild(act);
      frag.appendChild(card);
    }
    list.appendChild(frag);
  }

  function bind() {
    fillCountries();
    const country = document.getElementById("country");
    if (country) {
      country.onchange = () => {
        region = country.value;
        render();
      };
    }
    document.getElementById("genBtn").onclick = render;
    document.getElementById("mode").onchange = render;
    document.getElementById("clearBtn").onclick = () => {
      document.getElementById("list").innerHTML = "";
      document.getElementById("stat").textContent = "";
    };
    document.getElementById("copyAll").onclick = async () => {
      const cards = document.querySelectorAll("#list .addr-card");
      const out = [];
      cards.forEach((c) => {
        const ks = [...c.querySelectorAll(".addr-k")].map((e) => e.textContent);
        const vs = [...c.querySelectorAll(".addr-v")].map((e) => e.textContent);
        ks.forEach((k, i) => out.push(`${k}: ${vs[i]}`));
        out.push("");
      });
      await navigator.clipboard.writeText(out.join("\n"));
      const btn = document.getElementById("copyAll");
      btn.textContent = "已复制";
      setTimeout(() => (btn.textContent = "复制全部"), 1200);
    };
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }

  window.__addrRegions = Object.keys(STREETS).map((k) => ({ id: k, label: STREETS[k].label }));
})();
