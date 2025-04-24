// 갤러리 데이터 예시 (이 부분은 실제 데이터를 받아오는 방식에 맞게 수정해야 합니다.)
const artworks = [
    { id: 1, title: "작품 1", image: "image1.jpg", likes: 0, views: 0 },
    { id: 2, title: "작품 2", image: "image2.jpg", likes: 0, views: 0 },
    { id: 3, title: "작품 3", image: "image3.jpg", likes: 0, views: 0 },
  ];
  
  // localStorage에서 데이터 불러오기
  function getArtworksFromStorage() {
    const storedArtworks = JSON.parse(localStorage.getItem("artworks"));
    if (storedArtworks) {
      return storedArtworks;
    }
    return artworks; // 초기값 반환
  }
  
  // localStorage에 데이터 저장하기
  function saveArtworksToStorage(artworks) {
    localStorage.setItem("artworks", JSON.stringify(artworks));
  }
  
  // 좋아요 버튼 클릭 시
  function toggleLike(artworkId) {
    const artworks = getArtworksFromStorage();
    const artwork = artworks.find(a => a.id === artworkId);
    if (artwork) {
      artwork.likes += 1;
      saveArtworksToStorage(artworks);
      renderGallery(); // 갱신된 좋아요 수 반영
    }
  }
  
  // 작품 갤러리 렌더링
  function renderGallery() {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; // 기존 갤러리 내용 비우기
  
    const artworks = getArtworksFromStorage();
    artworks.forEach(artwork => {
      const artworkDiv = document.createElement("div");
      artworkDiv.classList.add("artwork");
  
      const artworkImage = document.createElement("img");
      artworkImage.src = artwork.image;
      artworkImage.alt = artwork.title;
      artworkImage.style.cursor = "pointer";
  
      // 클릭 시 detail 페이지로 이동 (조회수는 여기서 증가하지 않음)
      artworkImage.onclick = () => {
        window.location.href = `detail.html?id=${artwork.id}`;
      };
  
      const artworkTitle = document.createElement("h3");
      artworkTitle.innerText = artwork.title;
  
      const likeButton = document.createElement("button");
      likeButton.innerText = `좋아요 (${artwork.likes})`;
      likeButton.onclick = () => toggleLike(artwork.id);
  
      const viewCount = document.createElement("p");
      viewCount.innerText = `조회수: ${artwork.views}`;
  
      // 갤러리 페이지에서는 조회수 증가하지 않음 (단순히 보여주기만)
      // incrementViews(artwork.id); // 이 부분을 제거
  
      artworkDiv.appendChild(artworkImage);
      artworkDiv.appendChild(artworkTitle);
      artworkDiv.appendChild(likeButton);
      artworkDiv.appendChild(viewCount);
      gallery.appendChild(artworkDiv);
    });
  }
  
  // 페이지 로드 시 갤러리 렌더링
  window.onload = renderGallery;
  