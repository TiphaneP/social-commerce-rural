

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

  Menu, Bell, Check, Minus, Trash2

} from "lucide-react";

import "./App.css";

// Fotografias locais das publicações da comunidade
import tomatePost from "./assets/posts/tomates-na-planta.png";
import alfacePost from "./assets/posts/alfaces-na-horta.png";
import produtoraPost from "./assets/posts/produtora-na-horta.png";
import morangoPost from "./assets/posts/morangos-na-planta.jpg";


const initialProducts = [

  { id: 1, name: "Tomate italiano", category: "Frutas e legumes", price: 5, unit: "kg", quantity: 80, producer: "João Silva", city: "São Bento, PE", image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=900", description: "Tomates frescos, selecionados e cultivados com cuidado." },

  { id: 2, name: "Alface crespa", category: "Verduras", price: 1, unit: "unidade", quantity: 50, producer: "Maria Oliveira", city: "Belo Jardim, PE", image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=900", description: "Alface fresca, colhida diretamente da horta." },

  { id: 3, name: "Morango", category: "Frutas e legumes", price: 10, unit: "bandeja", quantity: 25, producer: "Sítio Boa Esperança", city: "Pesqueira, PE", image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=900", description: "Morangos selecionados, doces e fresquinhos." },

  { id: 4, name: "Cenoura", category: "Verduras", price: 4, unit: "kg", quantity: 60, producer: "Maria Oliveira", city: "Belo Jardim, PE", image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=900", description: "Cenouras frescas, direto da produção." },

  { id: 5, name: "Milho verde", category: "Grãos", price: 1.5, unit: "espiga", quantity: 100, producer: "João Silva", city: "São Bento, PE", image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=900", description: "Milho verde recém-colhido." },

  { id: 6, name: "Abóbora", category: "Frutas e legumes", price: 4.5, unit: "kg", quantity: 30, producer: "Sítio Boa Esperança", city: "Pesqueira, PE", image: "https://images.unsplash.com/photo-1506917728037-b6af01a7d403?w=900", description: "Abóboras cultivadas na propriedade." }

];



const initialPosts = [

  { id: 1, producer: "João Silva", city: "São Bento, PE", time: "Há 2 horas", avatar: joao, text: "Dia de colheita por aqui! Nossa produção de tomates está fresquinha e pronta para chegar até você. Tudo cultivado com muito cuidado! 🍅", image: tomatePost, product: 1, likes: 24 },

  { id: 2, producer: "Maria Oliveira", city: "Belo Jardim, PE", time: "Há 4 horas", avatar: maria, text: "O cuidado com a terra começa muito antes da colheita. Um pouco da nossa rotina de produção! 🌱", image: produtoraPost, product: 2, likes: 18 },

  { id: 3, producer: "Sítio Boa Esperança", city: "Pesqueira, PE", time: "Ontem", avatar: pedro, text: "Cada fruto recebe cuidado desde o plantio até a colheita. 🍓", image: morangoPost, product: 3, likes: 36 }

];



const money = (value) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });



function App() {

  const [page, setPage] = useState("Início");

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



  const filtered = products.filter(p =>

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

        <button className="publish-sidebar" onClick={() => setComposer(true)}><Plus size={19}/> Criar publicação</button>

        <div className="sidebar-note"><Sprout size={21}/><strong>Valorize quem cultiva.</strong><p>Conectando pessoas e fortalecendo a produção local.</p></div>

        <div className="profile-mini">

          <img src={visitante} alt="Perfil"/>

          <div><strong>Visitante</strong><span>Comunidade Raiz</span></div>

        </div>

      </aside>



      {mobileMenu && <div className="mobile-overlay" onClick={() => setMobileMenu(false)}/>}



      <main className="main-content">

        <header className="topbar">

          <button className="mobile-menu-button" onClick={() => setMobileMenu(true)}><Menu/></button>

          <div className="mobile-brand"><Sprout/> raiz.</div>

          <div className="search-box"><Search size={18}/><input placeholder="Busque produtos e produtores..." value={search} onChange={e => { setSearch(e.target.value); if(page !== "Marketplace") setPage("Marketplace"); }}/></div>

          <button className="cart-top" onClick={() => go("Pedidos")}><ShoppingCart size={20}/>{cart.length > 0 && <span>{cart.length}</span>}</button>

          <img className="topbar-avatar" src={visitante} alt="Perfil"/>

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



            <div className="feed-tabs"><span>Publicações recentes</span><span className="feed-count">{posts.length} publicações</span></div>

            <section className="feed-grid">

              {posts.map(post => {

                const product = products.find(p => p.id === post.product);

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

              {["João Silva","Maria Oliveira","Sítio Boa Esperança"].filter(n => n.toLowerCase().includes(producer.toLowerCase()) || producer === "João Silva").map((name, i) => {

                const p = products.find(x => x.producer === name);

                return <article className="producer-card" key={name}>

                  <img className="producer-cover" src={i === 1 ? "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=900" : "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900"} alt="Propriedade"/>

                  <div className="producer-body"><img className="producer-avatar" src={name === "João Silva" ? joao : name === "Maria Oliveira" ? maria : maria} alt=""/>

                    <h3>{name}</h3><span><MapPin size={13}/>{p?.city || "Pernambuco, PE"}</span>

                    <p>Produção local com dedicação, cuidado e respeito à terra.</p>

                    <button onClick={() => { setProducer(name); go("Perfil"); }}>Conhecer produtor <ChevronRight size={16}/></button>

                  </div>

                </article>;

              })}

            </section>

          </>}



          {page === "Perfil" && <>

            <button className="back-button" onClick={() => go("Produtores")}><ArrowLeft size={17}/> Voltar aos produtores</button>

            <div className="profile-cover"><img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200" alt="Propriedade"/></div>

            <div className="profile-heading"><img src={producer === "João Silva" ? joao : producer === "Maria Oliveira" ? maria : maria} alt=""/><div><span className="eyebrow">QUEM PRODUZ</span><h1>{producer}</h1><p><MapPin size={15}/> Pernambuco, PE</p></div><button className="follow-button" onClick={() => setFollowing(old => old.includes(producer) ? old.filter(x => x !== producer) : [...old, producer])}>{following.includes(producer) ? "Seguindo" : "Seguir +"}</button></div>

            <div className="profile-about"><h3>Nossa história</h3><p>Somos produtores rurais e acreditamos na força da agricultura local. Trabalhamos todos os dias para oferecer alimentos frescos, cultivados com cuidado e dedicação.</p></div>

            <div className="section-heading"><h2>Produtos disponíveis</h2></div>

            <section className="products-grid">{products.filter(p => p.producer === producer).map(productCard)}</section>

            <div className="section-heading"><h2>Publicações</h2></div>

            <section className="feed-grid">{posts.filter(p => p.producer === producer).map(p => <img className="profile-post-image" key={p.id} src={p.image} alt="Produção"/>)}</section>

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



      {composer && <div className="modal-overlay" onClick={() => setComposer(false)}><div className="composer-modal" onClick={e => e.stopPropagation()}><div className="modal-header"><h2>Compartilhe sua produção</h2><button onClick={() => setComposer(false)}><X/></button></div><textarea placeholder="Conte para a comunidade o que está acontecendo na sua propriedade..." value={caption} onChange={e => setCaption(e.target.value)}/><label className="upload-label"><Camera size={19}/> Escolher foto da produção<input type="file" accept="image/*" onChange={e => { const file = e.target.files?.[0]; if(file) setPhoto(URL.createObjectURL(file)); }}/></label>{photo && <img className="upload-preview" src={photo} alt="Prévia da publicação"/>}<select value={postProduct} onChange={e => setPostProduct(e.target.value)}><option value="">Associar produto (opcional)</option>{products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select><button className="modal-submit" disabled={!caption.trim()} onClick={publish}>Publicar na comunidade</button></div></div>}



      {notice && <div className="toast"><Check size={18}/>{notice}</div>}

    </div>

  );

}



export default App;
