// BOX12 JS START
// Küçük resimlere tıklama fonksiyonu
function changeImage(imageSrc) {
    const mainImage = document.getElementById('mainImage');
    const zoomedImage = document.getElementById('zoomedImage');
    mainImage.src = imageSrc;
    zoomedImage.src = imageSrc;
  }
  
  // Zoom işlemleri
  const mainImage = document.getElementById('mainImage');
  const zoomLens = document.getElementById('zoomLens');
  const zoomWindow = document.getElementById('zoomWindow');
  const zoomedImage = document.getElementById('zoomedImage');
  
  // Fareyi ana resmin üzerine getirme
  mainImage.addEventListener('mousemove', (event) => {
    const rect = mainImage.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    // Lens ve pencereyi göster
    zoomLens.style.display = 'block';
    zoomWindow.style.display = 'block';
  
    // Lens pozisyonunu ayarla
    const lensX = Math.max(0, Math.min(x - zoomLens.offsetWidth / 2, mainImage.offsetWidth - zoomLens.offsetWidth));
    const lensY = Math.max(0, Math.min(y - zoomLens.offsetHeight / 2, mainImage.offsetHeight - zoomLens.offsetHeight));
    zoomLens.style.left = `${lensX}px`;
    zoomLens.style.top = `${lensY}px`;
  
    // Zoomed resim pozisyonunu ayarla
    const zoomX = (lensX / mainImage.offsetWidth) * zoomedImage.offsetWidth;
    const zoomY = (lensY / mainImage.offsetHeight) * zoomedImage.offsetHeight;
    zoomedImage.style.left = `-${zoomX}px`;
    zoomedImage.style.top = `-${zoomY}px`;
  });
  
  // Fare büyük resmin dışına çıktığında lens ve pencereyi gizle
  mainImage.addEventListener('mouseleave', () => {
    zoomLens.style.display = 'none';
    zoomWindow.style.display = 'none';
  });
  
  
  const countElement = document.getElementById("count");
  const decreaseButton = document.getElementById("decrease");
  const increaseButton = document.getElementById("increase");
  
  let count = 1;
  
  decreaseButton.addEventListener("click", () => {
    if (count > 0) {
        count--;
        countElement.textContent = count;
    }
  });
  
  increaseButton.addEventListener("click", () => {
    count++;
    countElement.textContent = count;
  });
  
  
  // Küçük resimleri seç outline
  const smallImages = document.querySelectorAll('.small-images img');
  
  smallImages.forEach(img => {
    img.addEventListener('click', function () {
        // Önce tüm küçük resimlerden 'selected' sınıfını kaldır
        smallImages.forEach(image => image.classList.remove('selected'));
        
        // Tıklanan resme 'selected' sınıfını ekle
        this.classList.add('selected');
    });
  });  //outline end
  function updateZoomWindow(lensX, lensY) {
    const zoomX = (lensX / mainImage.offsetWidth) * zoomedImage.offsetWidth;
    const zoomY = (lensY / mainImage.offsetHeight) * zoomedImage.offsetHeight;
    zoomedImage.style.left = `-${zoomX}px`;
    zoomedImage.style.top = `-${zoomY}px`;
  }
  
  //BOX 12 JS END
  
  
  // SERACH BUTTON JS START
  
  
  // SERACH BUTTON JS END
  
  // BOX17 JS START
  
  function toggleContent(index) {
    var content = document.getElementById('content' + index);
    var plusSign = document.getElementById('plus' + index);
  
    // İçeriğin durumunu kontrol et
    if (content.classList.contains('open')) {
        content.classList.remove('open');  // İçeriği kapat
        plusSign.textContent = "+";  // "+" işaretini geri getir
    } else {
        content.classList.add('open');   // İçeriği aç
        plusSign.textContent = "-";  // "-" işaretini göster
    }
  } 
  // BOX17 JS END
  
  // BOX16-A JS START
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let currentIndex = 0;
  
  // Touch and Mouse Events
  slider.addEventListener('mousedown', startDrag);
  slider.addEventListener('mousemove', dragging);
  slider.addEventListener('mouseup', endDrag);
  slider.addEventListener('mouseleave', endDrag);
  
  slider.addEventListener('touchstart', startDrag);
  slider.addEventListener('touchmove', dragging);
  slider.addEventListener('touchend', endDrag);
  
  function startDrag(e) {
    isDragging = true;
    startPos = getPositionX(e);
    slider.style.cursor = 'grabbing';
  }
  
  function dragging(e) {
    if (!isDragging) return;
    const currentPosition = getPositionX(e);
    currentTranslate = prevTranslate + currentPosition - startPos;
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }
  
  function endDrag() {
    isDragging = false;
    slider.style.cursor = 'grab';
  
    // Snap to the nearest slide
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -50 && currentIndex < slides.length - 1) currentIndex++;
    if (movedBy > 50 && currentIndex > 0) currentIndex--;
  
    updateSliderPosition();
  }
  
  function getPositionX(e) {
    return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
  }
  
  function updateSliderPosition() {
    currentTranslate = currentIndex * -slider.clientWidth;
    prevTranslate = currentTranslate;
    slider.style.transform = `translateX(${currentTranslate}px)`;
    updateActiveDot();
  }
  
  function updateActiveDot() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
  }
  
  // Dots Navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateSliderPosition();
    });
  });
  
  
  // BOX16-A JS END
  // Arama Butonu ve Dropdown
  const searchBtn = document.getElementById("searchBtn");
  const searchDropdown = document.getElementById("searchDropdown");
  
  // Arama Butonuna Tıklanınca Açılma
  searchBtn.onclick = function(event) {
    event.stopPropagation(); // Butona tıklanırken dışarıdaki tıklamaları engelle
    if (searchDropdown.style.display === "block") {
      // Eğer dropdown zaten açık ise, gizle
      closeDropdown();
    } else {
      // Eğer dropdown kapalıysa, aç
      openDropdown();
    }
  }
  
  // Dışarıya Tıklanırsa Kapanma
  window.onclick = function(event) {
    if (!searchDropdown.contains(event.target) && event.target !== searchBtn) {
      closeDropdown();
    }
  }
  
  // Açılma Animasyonu
  function openDropdown() {
    searchDropdown.style.display = "block";
    setTimeout(() => {
      searchDropdown.style.opacity = "1";
      searchDropdown.style.transform = "translateY(0)"; // Aşağıya doğru kayarak açılma
    }, 10); // Animasyonun başlaması için küçük bir gecikme
  }
  
  // Kapanma Animasyonu
  function closeDropdown() {
    searchDropdown.style.opacity = "0";
    searchDropdown.style.transform = "translateY(-20px)"; // Yukarıya doğru kayarak kapanma
    setTimeout(() => {
      searchDropdown.style.display = "none";
    }, 300); // Animasyon süresi kadar bekle
  }


  //123
  

  