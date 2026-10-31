/**
 * K+E Arquitetura & Interiores - Main JavaScript
 * Arq. Kelly Velho & Arq. Eduardo Sperotto (Alphaville, Sorriso - MT)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuração padrão de WhatsApp
  const WHATSAPP_NUMBER = '5569992129777'; // +55 (69) 99212-9777

  // 1. Atualizar ano no rodapé
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Header Scroll Effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Mobile Navigation Drawer
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-cta a');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // 4. ScrollSpy: Atualizar navegação ativa ao rolar a página
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-desktop .nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // 5. Portfolio Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 6. Dados Detalhados dos Projetos para Lightbox Modal
  const projectsData = {
    'modal-quarto-gemeas': {
      title: 'Quarto Lívia & Liz',
      category: 'Design de Interiores • Quarto Infantil',
      location: 'Residência Alphaville • Sorriso - MT',
      image: 'assets/images/projects/quarto_gemeas_palha.webp',
      description: 'Ambiente concebido com extrema delicadeza para acompanhar o crescimento das irmãs. Camas personalizadas com cabeceiras em palha natural tramada, nicho em arco com iluminação perimetral quente e prateleiras em madeira nobre.',
      specs: [
        'Camas sob medida com palha natural e cantos arredondados',
        'Nicho em arco com iluminação indireta difusa 2700K',
        'Papel de parede botânico com desenhos autorais suaves',
        'Mesa de cabeceira central com arandela globo dourada'
      ]
    },
    'modal-espaco-office': {
      title: 'Espaço Vanity & Office',
      category: 'Marcenaria & Detalhamento Executivo',
      location: 'Residência Alphaville • MT',
      image: 'assets/images/projects/espaco_office_ripado.webp',
      description: 'Mobiliário integrado de alta precisão. O painel ripado vertical camufla a fiação e recebe fita de LED embutida, unindo a bancada de estudos suspensa aos armários aéreos com nichos abertos em carvalho.',
      specs: [
        'Painel ripado milimétrico com iluminação linear oculta',
        'Bancada suspensa com gavetas invisíveis de toque',
        'Cadeira estofada ergonômica em bouclé com pés dourados',
        'Nichos superiores em madeira carvalho natural'
      ]
    },
    'modal-terraco-lounge': {
      title: 'Terraço Panorâmico Lounge',
      category: 'Área Externa & Lazer Residencial',
      location: 'Alphaville Sorriso • Mato Grosso',
      image: 'assets/images/projects/terraco_lounge.webp',
      description: 'Lounge externo desenhado para contemplar o pôr do sol de Sorriso. O layout integra um generoso sofá curvo em tecido náutico impermeável, poltronas esculturais de fibra tramada e palmeiras que criam privacidade natural.',
      specs: [
        'Sofá curvo modular com tecido especial antimofo e hidrorrepelente',
        'Poltronas esculturais com base metálica e trama artesanal',
        'Mesa central redonda com balde de gelo embutido',
        'Piso mineral acetinado e grandes jardineiras com palmeiras'
      ]
    },
    'modal-corporativo-vidro': {
      title: 'Sede Corporativa & Reuniões',
      category: 'Arquitetura Corporativa Contemporânea',
      location: 'Sorriso - Mato Grosso',
      image: 'assets/images/projects/corporativo_vidro_led.jpg',
      description: 'Espaço comercial com atmosfera contemporânea e sóbria. Esquadrias de alumínio preto fosco com vidro acústico delimitam salas de reunião e audiência, valorizadas pelo teto em concreto aparente e perfis de LED contínuos.',
      specs: [
        'Divisórias piso-teto em perfis de alumínio preto e vidro laminado acústico',
        'Iluminação linear embutida no forro com acendimento dimerizável',
        'Pilares e vigas em concreto arquitetônico aparente',
        'Piso uniforme em porcelanato de grande formato cinza neutro'
      ]
    },
    'modal-suite-acolhedora': {
      title: 'Suíte Acolhedora Fendi',
      category: 'Design de Interiores • Dormitório',
      location: 'Residência Alphaville • Sorriso - MT',
      image: 'assets/images/projects/suite_acolhedora_linho.webp',
      description: 'A delicadeza dos tecidos fluidos encontra os tons fendi e blush. Cortinas de linho de vão duplo proporcionam privacidade e controle luminoso suave para o descanso.',
      specs: [
        'Cortinas duplas de linho natural do teto ao rodapé',
        'Armários planejados em laca fendi com portas frisadas',
        'Estante lateral com prateleiras abertas e iluminação suave',
        'Almofadas decorativas e tapete circular em textura plush'
      ]
    },
    'modal-fachada-ripada': {
      title: 'Residência Brise & Pedra',
      category: 'Arquitetura Residencial Contemporânea',
      location: 'Alphaville • Sorriso - Mato Grosso',
      image: 'assets/images/projects/fachada_ripada.jpg',
      description: 'Volumetria imponente equilibrada por elementos naturais. Os brises verticais em madeira garantem privacidade e controle solar, complementados pelo revestimento em pedra natural bruta e degraus em balanço iluminados.',
      specs: [
        'Brises verticais em madeira de lei tratada',
        'Degraus em concreto aparente com balanço estrutural',
        'Muro frontal em pedra natural com junta seca',
        'Paisagismo tropical com iluminação cênica de piso'
      ]
    },
    'modal-sala-jantar': {
      title: 'Espaço Gourmet & Jantar',
      category: 'Design de Interiores • Social',
      location: 'Residência Alphaville • Sorriso - MT',
      image: 'assets/images/projects/sala_jantar.jpg',
      description: 'Área social integrada pensada para reunir amigos e familiares com elegância despretensiosa. A mesa maciça é protagonista, harmonizada com cadeiras artesanais e cortinas fluidas de linho.',
      specs: [
        'Mesa de jantar para 10 lugares em madeira maciça',
        'Cadeiras com espaldar em palha natural tramada',
        'Sanca perimetral com fita de LED indireta',
        'Piso em porcelanato acetinado tom areia'
      ]
    },
    'modal-piscina-cascata': {
      title: 'Oásis Tropical & Cascata',
      category: 'Área de Lazer & Arquitetura Externa',
      location: 'Sorriso • Mato Grosso',
      image: 'assets/images/projects/piscina_cascata.jpg',
      description: 'A área de lazer traz uma cascata embutida em parede de pedra vulcânica escura, gerando som relaxante e reflexo límpido na piscina. As esquadrias de alumínio preto abrem 100% integrando a área interna à externa.',
      specs: [
        'Muro de destaque em pedras naturais vulcânicas',
        'Cascata com lâmina d\'água embutida',
        'Esquadrias minimalistas com trilhos embutidos',
        'Vasos cônicos esculturais em concreto arquitetônico'
      ]
    }
  };

  // 7. Lightbox Modal Logic
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxLocation = document.getElementById('lightboxLocation');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxSpecsList = document.getElementById('lightboxSpecsList');
  const lightboxCtaBtn = document.getElementById('lightboxCtaBtn');

  function openLightbox(modalId) {
    const data = projectsData[modalId];
    if (!data) return;

    lightboxImg.src = data.image;
    lightboxImg.alt = data.title;
    lightboxTitle.textContent = data.title;
    lightboxCategory.textContent = data.category;
    lightboxLocation.textContent = data.location;
    lightboxDesc.textContent = data.description;

    lightboxSpecsList.innerHTML = '';
    data.specs.forEach(spec => {
      const li = document.createElement('li');
      li.textContent = spec;
      lightboxSpecsList.appendChild(li);
    });

    lightboxOverlay.classList.add('active');
    lightboxOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxOverlay.classList.remove('active');
    lightboxOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Event Listeners dos botões de Zoom e Cards
  document.querySelectorAll('.project-zoom-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const modalId = btn.getAttribute('data-modal');
      openLightbox(modalId);
    });
  });

  // Permitir abrir ao clicar nos cards da seção Bento
  document.querySelectorAll('.bento-img-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const proj = card.getAttribute('data-project');
      const mapping = {
        'quarto_gemeas': 'modal-quarto-gemeas',
        'terraco_lounge': 'modal-terraco-lounge',
        'corporativo_vidro': 'modal-corporativo-vidro',
        'espaco_office': 'modal-espaco-office'
      };
      if (mapping[proj]) {
        openLightbox(mapping[proj]);
      }
    });
  });

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay) {
        closeLightbox();
      }
    });
  }

  if (lightboxCtaBtn) {
    lightboxCtaBtn.addEventListener('click', () => {
      closeLightbox();
    });
  }

  // Fechar com tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxOverlay && lightboxOverlay.classList.contains('active')) {
      closeLightbox();
    }
  });

  // 8. Formulário de Contato com Validação e Redirecionamento Inteligente para WhatsApp
  const contactForm = document.getElementById('contactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const city = document.getElementById('clientCity').value.trim();
      const type = document.getElementById('projectType').value;
      const area = document.getElementById('projectArea').value.trim();
      const message = document.getElementById('clientMessage').value.trim();

      // Montar mensagem elegante para o WhatsApp
      let waMessage = `*Novo Contato via Site K+E Arquitetura*\n\n`;
      waMessage += `*Nome:* ${name}\n`;
      waMessage += `*WhatsApp:* ${phone}\n`;
      if (city) waMessage += `*Localização:* ${city}\n`;
      waMessage += `*Tipo de Projeto:* ${type}\n`;
      if (area) waMessage += `*Área Estimada:* ${area}\n`;
      if (message) waMessage += `*Expectativas / Mensagem:* ${message}\n`;

      const encodedMessage = encodeURIComponent(waMessage);
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

      // Exibir alerta de sucesso visual
      if (formSuccessAlert) {
        formSuccessAlert.style.display = 'flex';
        contactForm.reset();
      }

      // Abrir o WhatsApp em nova guia após 600ms
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 600);
    });
  }

  // 9. Smooth Scroll para todos os links internos com compensação do header fixo
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
