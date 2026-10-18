
    /* 真实城市 + 真实路名（常见市政道路），门牌在道路上随机 */
    const STREETS = {
      us: {
        cities: [
          { city: "New York", state: "NY", zip: "10001", streets: ["Broadway","5th Avenue","Madison Avenue","Park Avenue","Lexington Avenue","6th Avenue","7th Avenue","8th Avenue","Amsterdam Avenue","Columbus Avenue","West 34th Street","East 42nd Street","Canal Street","Houston Street","Bleecker Street","Wall Street","Fulton Street","Atlantic Avenue","Queens Boulevard","Northern Boulevard"] },
          { city: "Los Angeles", state: "CA", zip: "90001", streets: ["Sunset Boulevard","Wilshire Boulevard","Santa Monica Boulevard","Hollywood Boulevard","Melrose Avenue","Rodeo Drive","Ventura Boulevard","Sepulveda Boulevard","Western Avenue","Figueroa Street","Grand Avenue","Olympic Boulevard","Venice Boulevard","La Brea Avenue","Fairfax Avenue"] },
          { city: "Chicago", state: "IL", zip: "60601", streets: ["Michigan Avenue","State Street","Wabash Avenue","Lake Shore Drive","Halsted Street","Western Avenue","Ashland Avenue","Fullerton Avenue","Archer Avenue","Madison Street","Jackson Boulevard","Roosevelt Road","Chicago Avenue","Division Street","Belmont Avenue"] },
          { city: "Houston", state: "TX", zip: "77001", streets: ["Main Street","Westheimer Road","Bissonnet Street","Richmond Avenue","Memorial Drive","Heights Boulevard","Shepherd Drive","Kirby Drive","Montrose Boulevard","Allen Parkway","Smith Street","Fannin Street","San Jacinto Street","Polk Street","Congress Street"] },
          { city: "San Francisco", state: "CA", zip: "94101", streets: ["Market Street","Mission Street","Van Ness Avenue","Fillmore Street","Divisadero Street","Geary Boulevard","California Street","Sacramento Street","Clement Street","Irving Street","Valencia Street","Castro Street","Haight Street","Folsom Street","Howard Street"] },
          { city: "Boston", state: "MA", zip: "02101", streets: ["Beacon Street","Commonwealth Avenue","Boylston Street","Newbury Street","Huntington Avenue","Washington Street","Tremont Street","Atlantic Avenue","Massachusetts Avenue","Cambridge Street","Summer Street","Winter Street","Marlborough Street","Hanover Street","Salem Street"] },
          { city: "Seattle", state: "WA", zip: "98101", streets: ["Pike Street","Pine Street","Olive Way","Denny Way","Broadway","East Union Street","Madison Street","Mercer Street","Rainier Avenue","Aurora Avenue","Lake City Way","University Way","Market Street","Ballard Avenue"] },
          { city: "Miami", state: "FL", zip: "33101", streets: ["Biscayne Boulevard","Brickell Avenue","Collins Avenue","Ocean Drive","Washington Avenue","Alton Road","Flagler Street","Coral Way","Bird Road","Calle Ocho","Miracle Mile"] }
        ],
        first: ["James","Mary","John","Patricia","Robert","Jennifer","Michael","Linda","David","Elizabeth","William","Barbara","Richard","Susan","Joseph","Jessica"],
        last: ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Martinez","Wilson","Anderson","Taylor","Thomas","Moore","Jackson","Martin"],
        emailDomain: ["gmail.com","yahoo.com","outlook.com","icloud.com"]
      },
      uk: {
        cities: [
          { city: "London", region: "England", zip: "SW1A 1AA", streets: ["Oxford Street","Regent Street","Piccadilly","The Strand","Fleet Street","Baker Street","Bond Street","Shaftesbury Avenue","Charing Cross Road","Whitehall","Parliament Street","Victoria Street","Kensington High Street","King's Road","Edgware Road","Bishopsgate","Threadneedle Street","Aldgate High Street","Borough High Street","Waterloo Road"] },
          { city: "Manchester", region: "England", zip: "M1 1AE", streets: ["Deansgate","Oxford Road","Portland Street","Piccadilly Gardens","Market Street","King Street","Cross Street","London Road","Stockport Road","Wilmslow Road","Cheetham Hill Road","Great Ancoats Street"] },
          { city: "Birmingham", region: "England", zip: "B1 1BB", streets: ["New Street","High Street","Colmore Row","Broad Street","Corporation Street","Bull Street","Steelhouse Lane","Soho Road","Stratford Road","Hagley Road","Bristol Road","Alcester Road"] },
          { city: "Edinburgh", region: "Scotland", zip: "EH1 1YZ", streets: ["Princes Street","Royal Mile","George Street","Leith Walk","Lothian Road","Bruntsfield Place","Haymarket Terrace","Duke Street","Leith Street","Nicolson Street"] },
          { city: "Glasgow", region: "Scotland", zip: "G1 1XQ", streets: ["Buchanan Street","Argyle Street","Sauchiehall Street","Renfield Street","Hope Street","Queen Street","Byres Road","Great Western Road","Duke Street","London Road"] }
        ],
        first: ["Oliver","Olivia","George","Amelia","Harry","Isla","Jack","Ava","Jacob","Emily","Noah","Sophia","Thomas","Mia","William","Grace"],
        last: ["Smith","Jones","Williams","Taylor","Brown","Davies","Wilson","Evans","Thomas","Roberts","Johnson","Lewis","Walker","Robinson","Wood","Thompson"],
        emailDomain: ["gmail.com","outlook.com","btinternet.com","yahoo.co.uk"]
      },
      cn: {
        cities: [
          { city: "上海市", prov: "上海", zip: "200000", district: "黄浦区", streets: ["南京东路","南京西路","淮海中路","人民大道","延安东路","中山南一路","世纪大道","陆家嘴环路","河南中路","福州路","九江路","汉口路","广东路","北京东路","北京西路"] },
          { city: "北京市", prov: "北京", zip: "100000", district: "东城区", streets: ["长安街","王府井大街","东单北大街","朝阳门内大街","东四北大街","安定门内大街","交道口南大街","美术馆东街","南锣鼓巷","五四大街","景山前街"] },
          { city: "广州市", prov: "广东", zip: "510000", district: "越秀区", streets: ["中山五路","北京路","人民中路","解放南路","沿江西路","东风中路","广州大道","天河路","体育东路","环市东路"] },
          { city: "深圳市", prov: "广东", zip: "518000", district: "福田区", streets: ["深南大道","红荔路","华富路","皇岗路","彩田路","福华路","滨河大道","香蜜湖路","人民南路","建设路"] },
          { city: "杭州市", prov: "浙江", zip: "310000", district: "上城区", streets: ["延安路","解放路","庆春路","凤起路","文三路","文一路","保俶路","中山中路","湖滨路","杨公堤"] },
          { city: "成都市", prov: "四川", zip: "610000", district: "青羊区", streets: ["人民中路","天府大道","红星路","春熙路","蜀都大道","滨江东路","科华北路","建设路","一环路","二环路"] },
          { city: "武汉市", prov: "湖北", zip: "430000", district: "江汉区", streets: ["中山大道","江汉路","解放大道","建设大道","沿江大道","发展大道","珞喻路","中南路","武珞路"] },
          { city: "西安市", prov: "陕西", zip: "710000", district: "碑林区", streets: ["长安中路","雁塔西路","小寨东路","东大街","西大街","南大街","北大街","友谊东路","太白南路"] }
        ],
        last: ["王","李","张","刘","陈","杨","黄","赵","周","吴","徐","孙","马","朱","胡","郭","何","高","林","罗"],
        first: ["伟","芳","娜","敏","静","丽","强","磊","军","洋","勇","艳","杰","娟","涛","明"],
        emailDomain: ["qq.com","163.com","126.com","gmail.com"]
      }
    };

    /* 公开地标 / 公共建筑地址（非私人住宅） */
    const LANDMARKS = {
      us: [
        { name: "Boston City Hall", address: "1 City Hall Square", city: "Boston", state: "MA", zip: "02201" },
        { name: "New York Public Library", address: "476 5th Ave", city: "New York", state: "NY", zip: "10018" },
        { name: "San Francisco City Hall", address: "1 Dr Carlton B Goodlett Pl", city: "San Francisco", state: "CA", zip: "94102" },
        { name: "Chicago City Hall", address: "121 N LaSalle St", city: "Chicago", state: "IL", zip: "60602" },
        { name: "Los Angeles City Hall", address: "200 N Spring St", city: "Los Angeles", state: "CA", zip: "90012" },
        { name: "University of Washington", address: "1410 NE Campus Pkwy", city: "Seattle", state: "WA", zip: "98195" },
        { name: "Houston City Hall", address: "901 Bagby St", city: "Houston", state: "TX", zip: "77002" },
        { name: "Miami-Dade County Building", address: "111 NW 1st St", city: "Miami", state: "FL", zip: "33128" }
      ],
      uk: [
        { name: "City of London (Guildhall)", address: "Gresham Street", city: "London", region: "England", zip: "EC2V 7HH" },
        { name: "British Library", address: "96 Euston Road", city: "London", region: "England", zip: "NW1 2DB" },
        { name: "University of Oxford (Sheldonian)", address: "Broad Street", city: "Oxford", region: "England", zip: "OX1 3AZ" },
        { name: "Manchester Town Hall", address: "Albert Square", city: "Manchester", region: "England", zip: "M2 5DB" },
        { name: "Birmingham Museum & Art Gallery", address: "Chamberlain Square", city: "Birmingham", region: "England", zip: "B3 3DH" },
        { name: "Edinburgh City Chambers", address: "High Street", city: "Edinburgh", region: "Scotland", zip: "EH1 1YJ" },
        { name: "Glasgow City Chambers", address: "George Square", city: "Glasgow", region: "Scotland", zip: "G2 1DU" },
        { name: "Cambridge University Library", address: "West Road", city: "Cambridge", region: "England", zip: "CB3 9DR" }
      ],
      cn: [
        { name: "上海市人民政府", address: "人民大道200号", city: "上海市", prov: "上海", zip: "200000", district: "黄浦区" },
        { name: "北京图书馆（国家图书馆）", address: "中关村南大街33号", city: "北京市", prov: "北京", zip: "100081", district: "海淀区" },
        { name: "广州市人民政府", address: "府前路1号", city: "广州市", prov: "广东", zip: "510032", district: "越秀区" },
        { name: "深圳市市民中心", address: "福中三路", city: "深圳市", prov: "广东", zip: "518000", district: "福田区" },
        { name: "浙江大学玉泉校区", address: "浙大路38号", city: "杭州市", prov: "浙江", zip: "310027", district: "西湖区" },
        { name: "成都市天府广场", address: "人民东路", city: "成都市", prov: "四川", zip: "610015", district: "青羊区" },
        { name: "武汉大学", address: "八一路299号", city: "武汉市", prov: "湖北", zip: "430072", district: "武昌区" },
        { name: "西安钟楼", address: "东大街", city: "西安市", prov: "陕西", zip: "710001", district: "碑林区" }
      ]
    };

    let region = "us";

    function pick(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    function randInt(min, max) {
      return min + Math.floor(Math.random() * (max - min + 1));
    }

    function formatOne(item, mode) {
      const wantName = document.getElementById("withName").checked;
      const d = STREETS[region];
      let out = {};
      if (mode === "landmark") {
        out = {
          名称: item.name,
          地址: item.address,
          城市: item.city
        };
        if (region === "uk") {
          out["郡/地区"] = item.region;
          out["邮编"] = item.zip;
        } else if (region === "cn") {
          out["区县"] = item.district;
          out["邮编"] = item.zip;
        } else {
          out["州"] = item.state;
          out["ZIP"] = item.zip;
        }
        if (wantName) {
          out["示例姓名"] = region === "cn"
            ? pick(d.last) + pick(d.first)
            : `${pick(d.first)} ${pick(d.last)}`;
        }
        return out;
      }

      // street mode
      const house = randInt(1, 3998);
      const line = `${house} ${item.streets[0] === undefined ? pick(item.streets) : pick(item.streets)}`;
      if (region === "cn") {
        out = {
          地址: `${pick(item.streets)}${house}号`,
          省市: item.city,
          区县: item.district,
          邮编: item.zip
        };
        if (wantName) {
          out["示例姓名"] = pick(d.last) + pick(d.first);
          out["手机"] = pick(["138","139","150","186","188"]) + String(randInt(10000000, 99999999));
        }
        return out;
      }

      out = {
        Street: line,
        City: item.city
      };
      if (region === "uk") {
        out.County = item.region;
        out.Postcode = item.zip;
        if (wantName) out.Name = `${pick(d.first)} ${pick(d.last)}`;
      } else {
        out.State = item.state;
        out.ZIP = item.zip;
        if (wantName) out.Name = `${pick(d.first)} ${pick(d.last)}`;
      }
      return out;
    }

    function generateOne() {
      const mode = document.getElementById("mode").value;
      const pool = mode === "landmark" ? LANDMARKS[region] : STREETS[region].cities;
      return formatOne(pick(pool), mode);
    }

    function render() {
      const n = Math.max(1, Math.min(50, parseInt(document.getElementById("count").value, 10) || 8));
      const mode = document.getElementById("mode").value;
      const pool = mode === "landmark" ? LANDMARKS[region] : STREETS[region].cities;
      const streetCount = mode === "street"
        ? pool.reduce((s, c) => s + c.streets.length, 0)
        : 0;
      document.getElementById("stat").textContent =
        mode === "street"
          ? `真实街道库：${pool.length} 城 × 约 ${streetCount} 条真实路名；门牌在 1–3998 随机。`
          : `公开地标库：${pool.length} 处公共建筑 / 机构地址。`;

      const list = document.getElementById("list");
      list.innerHTML = "";
      const frag = document.createDocumentFragment();
      for (let i = 0; i < n; i++) {
        const data = generateOne();
        const card = document.createElement("div");
        card.className = "addr-card";
        const h = document.createElement("h3");
        h.textContent = `#${i + 1}`;
        card.appendChild(h);
        const row = document.createElement("div");
        row.className = "row";
        Object.keys(data).forEach((k) => {
          const a = document.createElement("div");
          a.className = "addr-k";
          a.textContent = k;
          const b = document.createElement("div");
          b.className = "addr-v";
          b.textContent = data[k];
          row.appendChild(a);
          row.appendChild(b);
        });
        card.appendChild(row);
        const act = document.createElement("div");
        act.className = "addr-actions";
        const copyBtn = document.createElement("button");
        copyBtn.className = "btn btn-ghost";
        copyBtn.textContent = "复制本条";
        copyBtn.onclick = () => {
          const text = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n");
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

    document.querySelectorAll("#regionTabs [data-region]").forEach((btn) => {
      btn.addEventListener("click", () => {
        region = btn.getAttribute("data-region");
        document.querySelectorAll("#regionTabs [data-region]").forEach((b) => b.classList.remove("on"));
        btn.classList.add("on");
        render();
      });
    });

    render();
  