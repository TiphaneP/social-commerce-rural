

import { useState } from "react";

// Fotos de perfil demonstrativas (não precisam de arquivos locais).
const joao = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=faces";
const maria = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=faces";
const pedro = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=faces";
const visitante = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop&crop=faces";





import {

  Sprout, House, ShoppingBasket, Users, MessageCircle,

  Search, Plus, Heart, MapPin, UserRound, Camera,

  ChevronRight, X, ArrowLeft, ShoppingCart, Leaf,

  Menu, Bell, Check, Minus, Trash2, Mic, Volume2, Send, LogIn, Headphones

} from "lucide-react";

import "./App.css";

import alfacePost from "./assets/posts/alfaces-na-horta.png";
import morangoPost from "./assets/posts/morangos-na-planta.jpg";
import produtoraPost from "./assets/posts/produtora-na-horta.png";
import tomatePost from "./assets/posts/tomates-na-planta.png";
import cenouraPost from "./assets/posts/cenoura.jpg";

const initialProducts = [

  { id: 1, name: "Tomate italiano", category: "Frutas e legumes", price: 5, unit: "kg", quantity: 80, producer: "João Silva", city: "Sanharó, PE", image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=900", description: "Tomates frescos, selecionados e cultivados com cuidado." },

  { id: 2, name: "Alface crespa", category: "Verduras", price: 2, unit: "unidade", quantity: 50, producer: "Maria Oliveira", city: "Belo Jardim, PE", image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=900", description: "Alface fresca, colhida diretamente da horta." },

  { id: 3, name: "Morango", category: "Frutas e legumes", price: 10, unit: "bandeja", quantity: 25, producer: "José Ricardo", city: "Pesqueira, PE", image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=900", description: "Morangos selecionados, doces e fresquinhos." },

  { id: 4, name: "Cenoura", category: "Verduras", price: 4, unit: "kg", quantity: 60, producer: "Maria Oliveira", city: "Belo Jardim, PE", image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=900", description: "Cenouras frescas, direto da produção." },

  { id: 5, name: "Milho verde", category: "Grãos", price: 1.5, unit: "espiga", quantity: 100, producer: "João Silva", city: "Sanharó, PE", image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=900", description: "Milho verde recém-colhido." },

  { id: 6, name: "Abóbora", category: "Frutas e legumes", price: 4.5, unit: "kg", quantity: 30, producer: "José Ricardo", city: "Pesqueira, PE", image: "https://images.unsplash.com/photo-1506917728037-b6af01a7d403?w=900", description: "Abóboras cultivadas na propriedade." }

];



const initialPosts = [

  { id: 1, producer: "João Silva", city: "Sanharó, PE", time: "Há 2 horas", avatar: joao, text: "Dia de colheita por aqui! Nossa produção de tomates está fresquinha e pronta para chegar até você. Tudo cultivado com muito cuidado! 🍅", image: tomatePost, product: 1, likes: 24 },

  { id: 2, producer: "Maria Oliveira", city: "Belo Jardim, PE", time: "Há 4 horas", avatar: maria, text: "Nossa horta está cheia de novidades! Hoje foi dia de colher alfaces fresquinhas. Produção feita com dedicação e carinho. 🥬", image: produtoraPost, product: 2, likes: 18 },

  { id: 3, producer: "José Ricardo", city: "Pesqueira, PE", time: "Ontem", avatar: pedro, text: "Cada fruto recebe cuidado desde o plantio até a colheita. 🍓", image: morangoPost, product: 3, likes: 26 },

  { id: 4, producer: "Maria Oliveira", city: "Belo Jardim, PE", time: "Ontem", avatar: maria, text: "O cuidado com a terra começa muito antes da colheita. Um pouco da nossa rotina de produção! 🌱", image: cenouraPost, product: 4, likes: 36 }

];



const money = (value) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });



function App() {

  const [page, setPage] = useState("Início");
  const [authenticated, setAuthenticated] = useState(false);
  const [userMode, setUserMode] = useState("visitor");
  const [loginProducer, setLoginProducer] = useState("Maria Oliveira");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", text: "Olá! Eu sou a ajuda da Raiz. Toque no microfone e fale o que você precisa. Também posso ler as respostas para você." }
  ]);
  const [isListening, setIsListening] = useState(false);

  const [products, setProducts] = useState(initialProducts);

  const [posts, setPosts] = useState(initialPosts);

  const [likes, setLikes] = useState([]);

  const [following, setFollowing] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("Todos");

  const [selected, setSelected] = useState(null);

  const [cart, setCart] = useState([]);

  const [notice, setNotice] = useState("");

  const [producer, setProducer] = useState("João Silva");

  const [composer, setComposer] = useState(false);

  const [caption, setCaption] = useState("");

  const [photo, setPhoto] = useState("");

  const [postProduct, setPostProduct] = useState("");

  const [quantity, setQuantity] = useState(1);

  const [mobileMenu, setMobileMenu] = useState(false);



  const categories = ["Todos", "Frutas e legumes", "Verduras", "Grãos"];



  function notify(message) {

    setNotice(message);

    setTimeout(() => setNotice(""), 2800);

  }



  function go(next) {

    setPage(next);

    setSelected(null);

    setMobileMenu(false);

  }


  const producerNames = ["João Silva", "Maria Oliveira", "José Ricardo"];

  function avatarFor(name) {
    return name === "João Silva" ? joao : name === "Maria Oliveira" ? maria : pedro;
  }

  function enterAsVisitor() {
    setUserMode("visitor");
    setAuthenticated(true);
    setPage("Início");
  }

  function enterAsProducer() {
    setProducer(loginProducer);
    setUserMode("producer");
    setAuthenticated(true);
    setPage("Início");
  }

  function speak(text) {
    if (!("speechSynthesis" in window)) {
      notify("A leitura em voz alta não está disponível neste navegador.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.rate = 0.92;
    window.speechSynthesis.speak(utterance);
  }

  function answerAssistant(question) {
    const q = question.toLowerCase();
    if (q.includes("produto") || q.includes("cadastrar") || q.includes("preço")) {
      return "Para cadastrar um produto, abra o Marketplace e escolha a opção de criar produto. Informe o nome, o preço e a quantidade. Se precisar, peça ajuda para preencher os dados.";
    }
    if (q.includes("public") || q.includes("foto") || q.includes("colheita")) {
      return "Para mostrar sua colheita, toque em Criar publicação. Escolha uma foto e conte, com suas palavras, o que está acontecendo na sua horta. Depois toque em Publicar.";
    }
    if (q.includes("pedido") || q.includes("venda") || q.includes("compr")) {
      return "Quando alguém solicitar seus produtos, abra a área de Pedidos para conferir a solicitação. Combine a quantidade, a entrega e o pagamento diretamente com a pessoa.";
    }
    if (q.includes("ajuda") || q.includes("começar") || q.includes("usar")) {
      return "Você pode usar a Raiz para divulgar sua produção e mostrar seus produtos. Fale comigo pelo microfone ou escolha uma das opções de ajuda.";
    }
    return "Entendi. Posso ajudar com cadastro de produtos, publicação de fotos ou pedidos. Diga uma dessas opções ou toque em um dos atalhos.";
  }

  function sendChatMessage(message = chatInput) {
    const clean = message.trim();
    if (!clean) return;
    const response = answerAssistant(clean);
    setChatMessages(old => [...old, { role: "user", text: clean }, { role: "assistant", text: response }]);
    setChatInput("");
    speak(response);
  }

  function startVoiceInput() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      notify("Seu navegador não oferece reconhecimento de voz. Use o campo de texto ou abra no Chrome/Edge.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => {
      setIsListening(false);
      notify("Não consegui captar o áudio. Verifique a permissão do microfone.");
    };
    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript;
      setChatInput(transcript);
      sendChatMessage(transcript);
    };
    recognition.start();
  }

  const visibleProducts = userMode === "producer"
    ? products.filter(item => item.producer === producer)
    : products;

  const visiblePosts = userMode === "producer"
    ? posts.filter(item => item.producer === producer || item.producer === "Você")
    : posts;



  function addCart(product, amount = 1) {

    setCart(old => {

      const found = old.find(item => item.id === product.id);

      return found

        ? old.map(item => item.id === product.id ? { ...item, amount: item.amount + amount } : item)

        : [...old, { ...product, amount }];

    });

    notify("Produto adicionado à sua lista de pedidos!");

  }



  function changeAmount(id, amount) {

    setCart(old => old.map(item => item.id === id ? { ...item, amount: Math.max(1, amount) } : item));

  }



  function publish() {

    if (!caption.trim()) return;

    setPosts(old => [{

      id: Date.now(),

      producer: "Você",

      city: "Pernambuco, PE",

      time: "Agora",

      avatar: visitante,

      text: caption,

      image: photo || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000",

      product: Number(postProduct) || null,

      likes: 0

    }, ...old]);

    setCaption("");

    setPhoto("");

    setPostProduct("");

    setComposer(false);

    go("Início");

    notify("Publicação criada com sucesso!");

  }



  const filtered = visibleProducts.filter(p =>

    (category === "Todos" || p.category === category) &&

    `${p.name} ${p.producer} ${p.city}`.toLowerCase().includes(search.toLowerCase())

  );



  const total = cart.reduce((sum, item) => sum + item.price * item.amount, 0);



  const nav = [

    { name: "Início", icon: House },

    { name: "Marketplace", icon: ShoppingBasket },

    { name: "Produtores", icon: Users },

    { name: "Pedidos", icon: ShoppingCart }

  ];



  function productCard(product) {

    return (

      <article className="product-card" key={product.id}>

        <button className="product-photo" onClick={() => { setSelected(product); setQuantity(1); }}>

          <img src={product.image} alt={product.name} />

          <span className="photo-tag">Produção local</span>

        </button>

        <div className="product-info">

          <span className="product-category">{product.category}</span>

          <h3>{product.name}</h3>

          <p className="product-location"><MapPin size={13}/>{product.city}</p>

          <div className="product-bottom">

            <div><strong>{money(product.price)}</strong><span> / {product.unit}</span></div>

            <button onClick={() => addCart(product)} aria-label="Adicionar ao pedido"><Plus size={19}/></button>

          </div>

          <button className="producer-link" onClick={() => { setProducer(product.producer); go("Produtores"); }}>Por {product.producer}</button>

        </div>

      </article>

    );

  }



  if (!authenticated) {
    return (
      <div className="login-screen">
        <div className="login-card">
          <div className="login-brand"><span className="login-brand-icon"><Sprout size={30}/></span><strong>raiz<span>.</span></strong></div>
          <p className="login-eyebrow">CONECTANDO QUEM PLANTA A QUEM CONSOME</p>
          <h1>Bem-vindo à Raiz</h1>
          <p className="login-description">Entre para conhecer a produção local e acompanhar as histórias de quem cultiva.</p>
          <button className="login-primary" onClick={enterAsVisitor}><UserRound size={19}/> Entrar como visitante</button>
          <div className="login-divider"><span>ou</span></div>
          <label className="login-select-label" htmlFor="demo-producer">Simular acesso de produtor</label>
          <select id="demo-producer" value={loginProducer} onChange={e => setLoginProducer(e.target.value)}>
            {producerNames.map(name => <option key={name} value={name}>{name}</option>)}
          </select>
          <button className="login-secondary" onClick={enterAsProducer}><LogIn size={18}/> Entrar na demonstração</button>
          <small>Ambiente demonstrativo • Não exige cadastro ou senha</small>
        </div>
      </div>
    );
  }

  return (

    <div className="app-container">

      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>

        <div className="brand">

          <div className="brand-icon"><Sprout size={26}/></div>

          <span>raiz<span className="brand-dot">.</span></span>

          <button className="close-menu" onClick={() => setMobileMenu(false)}><X/></button>

        </div>

        <span className="sidebar-label">COMUNIDADE</span>

        <nav className="navigation">

          {nav.map(({ name, icon: Icon }) => (

            <button key={name} className={`nav-item ${page === name ? "active" : ""}`} onClick={() => go(name)}>

              <Icon size={19}/>{name}

              {name === "Pedidos" && cart.length > 0 && <span className="nav-count">{cart.length}</span>}

            </button>

          ))}

        </nav>

        {userMode === "producer" && <button className="nav-item producer-own-profile" onClick={() => go("Perfil")}><UserRound size={19}/> Meu perfil</button>}
        <button className="publish-sidebar" onClick={() => setComposer(true)}><Plus size={19}/> Criar publicação</button>

        <div className="sidebar-note"><Sprout size={21}/><strong>Valorize quem cultiva.</strong><p>Conectando pessoas e fortalecendo a produção local.</p></div>

        <div className="profile-mini">

          <img src={userMode === "producer" ? avatarFor(producer) : visitante} alt="Perfil"/>

          <div><strong>{userMode === "producer" ? producer : "Visitante"}</strong><span>{userMode === "producer" ? "Modo produtor • demonstração" : "Comunidade Raiz"}</span></div>

        </div>

      </aside>



      {mobileMenu && <div className="mobile-overlay" onClick={() => setMobileMenu(false)}/>}



      <main className="main-content">

        <header className="topbar">

          <button className="mobile-menu-button" onClick={() => setMobileMenu(true)}><Menu/></button>

          <div className="mobile-brand"><Sprout/> raiz.</div>

          <div className="search-box"><Search size={18}/><input placeholder="Busque produtos e produtores..." value={search} onChange={e => { setSearch(e.target.value); if(page !== "Marketplace") setPage("Marketplace"); }}/></div>

          <button className="cart-top" onClick={() => go("Pedidos")}><ShoppingCart size={20}/>{cart.length > 0 && <span>{cart.length}</span>}</button>

          <button className="logout-demo" onClick={() => { setAuthenticated(false); setUserMode("visitor"); setPage("Início"); setAssistantOpen(false); }}>Sair</button>
          <img className="topbar-avatar" src={userMode === "producer" ? avatarFor(producer) : visitante} alt="Perfil"/>

        </header>



        <div className="page-content">

          {page === "Início" && <>

            <section className="hero-section">

              <div>

                <span className="eyebrow">A COMUNIDADE QUE CULTIVA CONEXÕES</span>

                <h1>O campo mais perto de <em>você.</em></h1>

                <p>Descubra histórias, conheça produtores e valorize quem cultiva.</p>

                <button className="hero-button" onClick={() => go("Marketplace")}>Explorar produtos <ChevronRight size={17}/></button>

              </div>

              <div className="hero-photo"><img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900" alt="Plantação"/><span>Da terra para a sua mesa.</span></div>

            </section>



            <div className="section-heading"><div><span className="eyebrow">CONEXÃO E PRODUÇÃO</span><h2>Histórias da nossa terra</h2></div><button className="text-link" onClick={() => go("Produtores")}>Ver produtores <ChevronRight size={16}/></button></div>




            <div className="feed-tabs"><span>Publicações recentes</span><span className="feed-count">{visiblePosts.length} publicações</span></div>

            <section className="feed-grid">

              {visiblePosts.map(post => {

                const product = visibleProducts.find(p => p.id === post.product);

                const liked = likes.includes(post.id);

                return <article className="post-card" key={post.id}>

                  <div className="post-header">

                    <img src={post.avatar} alt=""/>

                    <div className="post-author"><strong>{post.producer}</strong><span><MapPin size={12}/>{post.city} · {post.time}</span></div>

                    <button className="follow-button" onClick={() => setFollowing(old => old.includes(post.producer) ? old.filter(x => x !== post.producer) : [...old, post.producer])}>{following.includes(post.producer) ? "Seguindo" : "Seguir +"}</button>

                  </div>

                  <p className="post-description">{post.text}</p>

                  <img className="post-image" src={post.image} alt="Produção rural"/>

                  <div className="post-actions">

                    <button className={liked ? "liked" : ""} onClick={() => setLikes(old => liked ? old.filter(x => x !== post.id) : [...old, post.id])}><Heart size={19} fill={liked ? "currentColor" : "none"}/>{post.likes + (liked ? 1 : 0)}</button>

                    <button onClick={() => notify("Comentários demonstrativos em breve.")}><MessageCircle size={19}/> Comentar</button>

                    <button onClick={() => notify("Publicação pronta para compartilhar!")}>Compartilhar</button>

                  </div>

                  {product && <div className="post-product"><div><span>PRODUTO DESTA PUBLICAÇÃO</span><strong>{product.name}</strong><p>{money(product.price)} / {product.unit}</p></div><button onClick={() => { setSelected(product); setQuantity(1); }}>Ver produto <ChevronRight size={16}/></button></div>}

                </article>;

              })}

            </section>

          </>}



          {page === "Marketplace" && <>

            <div className="page-intro"><span className="eyebrow">COMPRE DIRETO DE QUEM PRODUZ</span><h1>Marketplace</h1><p>Produtos fresquinhos, histórias reais e produtores perto de você.</p></div>

            <div className="market-banner"><div><Sprout size={23}/><strong>Valorize a produção local.</strong><span>Encontre produtos e conheça quem está por trás de cada colheita.</span></div></div>

            <div className="category-row">{categories.map(c => <button key={c} className={category === c ? "category-active" : ""} onClick={() => setCategory(c)}>{c}</button>)}</div>

            <div className="section-heading"><div><h2>Produtos disponíveis</h2><span className="muted-text">{filtered.length} produtos encontrados</span></div></div>

            <section className="products-grid">{filtered.map(productCard)}</section>

            {filtered.length === 0 && <div className="empty-state">Nenhum produto encontrado.</div>}

          </>}



          {page === "Produtores" && <>

            <div className="page-intro"><span className="eyebrow">QUEM FAZ ACONTECER</span><h1>Conheça os produtores</h1><p>Por trás de cada alimento, existe uma história.</p></div>

            <section className="producers-grid">

              {(userMode === "producer" ? [producer] : producerNames).map((name, i) => {

                const p = products.find(x => x.producer === name);

                return <article className="producer-card" key={name}>

                  <img className="producer-cover" src={i === 1 ? "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=900" : "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900"} alt="Propriedade"/>

                  <div className="producer-body"><img className="producer-avatar" src={name === "João Silva" ? joao : name === "Maria Oliveira" ? maria : pedro} alt=""/>

                    <h3>{name}</h3><span><MapPin size={13}/>{p?.city || "Pernambuco, PE"}</span>

                    <p>Produção local com dedicação, cuidado e respeito à terra.</p>

                    <button onClick={() => { setProducer(name); go("Perfil"); }}>Conhecer produtor <ChevronRight size={16}/></button>

                  </div>

                </article>;

              })}

            </section>

          </>}



          {page === "Perfil" && <>

            <div className="profile-page">
              <button className="back-button" onClick={() => go("Produtores")}><ArrowLeft size={17}/> Voltar aos produtores</button>

              <div className="profile-cover">
                <img src={producer === "Maria Oliveira" ? "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=1200" : producer === "João Silva" ? "https://images.unsplash.com/photo-1592982537447-6f2a6a0a9c3d?w=1200" : "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200"} alt={"Produção de " + producer}/>
              </div>

              <div className="profile-heading">
                <img src={avatarFor(producer)} alt={"Foto de " + producer}/>
                <div className="profile-heading-info">
                  <span className="eyebrow">QUEM PRODUZ</span>
                  <h1>{producer}</h1>
                  <p><MapPin size={15}/>{products.find(p => p.producer === producer)?.city || "Pernambuco, PE"}</p>
                </div>
                {userMode === "visitor" && <button className="follow-button" onClick={() => setFollowing(old => old.includes(producer) ? old.filter(x => x !== producer) : [...old, producer])}>{following.includes(producer) ? "Seguindo" : "Seguir +"}</button>}
                {userMode === "producer" && <span className="own-profile-label">Seu perfil de demonstração</span>}
              </div>

              <div className="profile-about">
                <h3>Nossa história</h3>
                <p>Somos produtores rurais e acreditamos na força da agricultura local. Trabalhamos todos os dias para oferecer alimentos frescos, cultivados com cuidado e dedicação.</p>
              </div>

              <div className="section-heading"><h2>Produtos disponíveis</h2></div>
              <section className="products-grid">{visibleProducts.filter(p => p.producer === producer).map(productCard)}</section>

              <div className="section-heading"><h2>Publicações</h2></div>
              <section className="profile-publications-grid">
                {visiblePosts.filter(p => p.producer === producer).map(p => <article className="profile-publication-card" key={p.id}><img className="profile-post-image" src={p.image} alt={"Publicação de " + producer}/><p>{p.text}</p></article>)}
              </section>
            </div>

          </>}



          {page === "Pedidos" && <>

            <div className="page-intro"><span className="eyebrow">SUA EXPERIÊNCIA DE COMPRA</span><h1>Minha lista de pedidos</h1><p>Revise os produtos que deseja solicitar aos produtores.</p></div>

            {cart.length === 0 ? <div className="empty-state"><ShoppingBasket size={40}/><h3>Sua lista está vazia</h3><p>Explore o marketplace e encontre produtos locais.</p><button className="hero-button" onClick={() => go("Marketplace")}>Explorar produtos</button></div> :

              <div className="order-layout"><section className="order-items">{cart.map(item => <div className="order-item" key={item.id}><img src={item.image} alt=""/><div className="order-item-info"><strong>{item.name}</strong><span>{item.producer}</span><strong>{money(item.price)} / {item.unit}</strong></div><div className="quantity-control"><button onClick={() => changeAmount(item.id, item.amount - 1)}><Minus size={14}/></button>{item.amount}<button onClick={() => changeAmount(item.id, item.amount + 1)}><Plus size={14}/></button></div><button className="remove-item" onClick={() => setCart(old => old.filter(x => x.id !== item.id))}><Trash2 size={17}/></button></div>)}</section>

              <aside className="order-summary"><h3>Resumo da solicitação</h3><div><span>Produtos</span><strong>{cart.length}</strong></div><div><span>Valor estimado</span><strong>{money(total)}</strong></div><p>O valor final, frete e disponibilidade deverão ser confirmados pelo produtor.</p><button className="hero-button" onClick={() => { setCart([]); notify("Solicitação demonstrativa registrada!"); }}>Enviar solicitação <ChevronRight size={17}/></button></aside></div>}

          </>}

        </div>

      </main>



      <nav className="mobile-nav">

        {nav.map(({name, icon: Icon}) => <button key={name} className={page === name ? "mobile-active" : ""} onClick={() => go(name)}><Icon size={21}/><span>{name === "Marketplace" ? "Loja" : name}</span></button>)}

        <button onClick={() => setComposer(true)}><Plus size={21}/><span>Publicar</span></button>

      </nav>



      {selected && <div className="modal-overlay" onClick={() => setSelected(null)}><div className="product-modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)}><X/></button><img className="modal-product-image" src={selected.image} alt={selected.name}/><div className="modal-product-body"><span className="eyebrow">{selected.category}</span><h2>{selected.name}</h2><p>{selected.description}</p><div className="modal-producer"><MapPin size={15}/>{selected.producer} · {selected.city}</div><h2 className="modal-price">{money(selected.price)} <small>/ {selected.unit}</small></h2><span className="muted-text">{selected.quantity} disponíveis (demonstração)</span><div className="quantity-selector"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16}/></button>{quantity}<button onClick={() => setQuantity(quantity + 1)}><Plus size={16}/></button></div><button className="hero-button full-button" onClick={() => { addCart(selected, quantity); setSelected(null); }}>Adicionar à lista de pedidos <ShoppingBasket size={18}/></button></div></div></div>}



      {composer && <div className="modal-overlay" onClick={() => setComposer(false)}><div className="composer-modal" onClick={e => e.stopPropagation()}><div className="modal-header"><h2>Compartilhe sua produção</h2><button onClick={() => setComposer(false)}><X/></button></div><textarea placeholder="Conte para a comunidade o que está acontecendo na sua propriedade..." value={caption} onChange={e => setCaption(e.target.value)}/><label className="upload-label"><Camera size={19}/> Escolher foto da produção<input type="file" accept="image/*" onChange={e => { const file = e.target.files?.[0]; if(file) setPhoto(URL.createObjectURL(file)); }}/></label>{photo && <img className="upload-preview" src={photo} alt="Prévia da publicação"/>}<select value={postProduct} onChange={e => setPostProduct(e.target.value)}><option value="">Associar produto (opcional)</option>{visibleProducts.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select><button className="modal-submit" disabled={!caption.trim()} onClick={publish}>Publicar na comunidade</button></div></div>}



      {assistantOpen && <section className="voice-assistant" aria-label="Assistente da Raiz">
        <header className="voice-assistant-header">
          <div><span className="assistant-avatar"><Headphones size={19}/></span><div><strong>Ajuda da Raiz</strong><small>Assistente por voz • demonstração</small></div></div>
          <button onClick={() => setAssistantOpen(false)} aria-label="Fechar assistente"><X size={18}/></button>
        </header>
        <div className="voice-chat-messages">
          {chatMessages.map((message, index) => <div key={index} className={"voice-message " + message.role}>
            <p>{message.text}</p>
            {message.role === "assistant" && <button className="speak-message" onClick={() => speak(message.text)}><Volume2 size={15}/> Ouvir</button>}
          </div>)}
        </div>
        <div className="voice-shortcuts">
          <button onClick={() => sendChatMessage("Como cadastrar um produto?")}>Cadastrar produto</button>
          <button onClick={() => sendChatMessage("Como publicar uma foto da colheita?")}>Publicar colheita</button>
          <button onClick={() => sendChatMessage("Como ver meus pedidos?")}>Ver pedidos</button>
        </div>
        <div className="voice-input-row">
          <button className={"voice-mic " + (isListening ? "listening" : "")} onClick={startVoiceInput} title="Falar com a Raiz"><Mic size={19}/></button>
          <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChatMessage()} placeholder="Digite ou toque no microfone..."/>
          <button className="voice-send" onClick={() => sendChatMessage()} aria-label="Enviar"><Send size={18}/></button>
        </div>
        <small className="voice-note">O microfone usa reconhecimento de voz do navegador. A ajuda é simulada para esta apresentação.</small>
      </section>}
      <button className="voice-assistant-fab" onClick={() => setAssistantOpen(old => !old)} aria-label="Abrir ajuda por voz">
        {assistantOpen ? <X size={22}/> : <><MessageCircle size={21}/><span>Precisa de ajuda?</span></>}
      </button>

      {notice && <div className="toast"><Check size={18}/>{notice}</div>}

    </div>

  );

}



export default App;
