// URL에서 작품 ID 가져오기
const params = new URLSearchParams(window.location.search);
const artworkId = params.get("id");

// 작품 불러오기
function getArtworksFromStorage() {
  return JSON.parse(localStorage.getItem("artworks")) || [];
}

function saveArtworksToStorage(artworks) {
  localStorage.setItem("artworks", JSON.stringify(artworks));
}

// 매번 조회수 증가
function increaseView(id) {
    const artworks = getArtworksFromStorage();
    const artwork = artworks.find(a => a.id === id);
    if (artwork) {
      artwork.views += 1;
      saveArtworksToStorage(artworks);
    }
  }

// 좋아요 제한: 한 작품에 대해 한 번만
function likeArtwork(id) {
  const likedKey = `liked_${id}`;
  if (localStorage.getItem(likedKey)) {
    alert("이미 좋아요를 눌렀습니다!");
    return;
  }

  const artworks = getArtworksFromStorage();
  const artwork = artworks.find(a => a.id === id);
  if (artwork) {
    artwork.likes += 1;
    saveArtworksToStorage(artworks);
    localStorage.setItem(likedKey, "true");
    renderArtworkDetail(artwork); // 갱신된 좋아요 수 반영
  }
}

// 상세 페이지 렌더링
function renderArtworkDetail(artwork) {
  const container = document.getElementById("artwork-detail");
  container.innerHTML = `
    <h2>${artwork.title}</h2>
    <img src="${artwork.image}" alt="${artwork.title}" style="width:300px;" />
    <p>조회수: ${artwork.views}</p>
    <p>좋아요: ${artwork.likes}</p>
    <button onclick="likeArtwork(${artwork.id})">좋아요 ❤️</button>
  `;
}

// 실행
const artworks = getArtworksFromStorage();
const artwork = artworks.find(a => a.id === artworkId);

if (artwork) {
    increaseView(artworkId); // increaseViewOnce에서 increaseView로 변경
    renderArtworkDetail(artwork);
  } else {
    document.getElementById("artwork-detail").innerText = "작품을 찾을 수 없습니다.";
  }
