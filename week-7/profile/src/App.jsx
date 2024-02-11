import Card from "./components/Card"


const cards = [
  {
    id: 1,
    name: 'Jaswanth',
    age: 22,
    address: 'Machilipatnam',
    profilePicture: 'https://cdn.bio.link/uploads/profile_pictures/2023-12-13/ecPd2E4Jk37G352slDTTDqoOtUhPPSfw.png',
    backgroundImage: 'https://i.pinimg.com/564x/cb/64/33/cb643340343d0f6259fdd7492d9fb000.jpg',
    followers: '10k',
    following: '1',
    photos: '20'
  },
  {
    id: 2,
    name: 'Vasanth',
    age: 19,
    address: 'San Jose',
    profilePicture: 'https://img.freepik.com/premium-vector/cartoon-dragon-with-word-dragon-it_688149-585.jpg',
    backgroundImage: 'https://c4.wallpaperflare.com/wallpaper/264/666/478/3-316-16-9-aspect-ratio-s-sfw-wallpaper-preview.jpg',
    followers: '100k',
    following: '19',
    photos: '235'
  },
  {
    id: 3,
    name: 'Deepak',
    age: 23,
    address: 'London',
    profilePicture: 'https://img.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37345.jpg',
    backgroundImage: 'https://c4.wallpaperflare.com/wallpaper/863/172/896/3-316-16-9-aspect-ratio-s-sfw-wallpaper-preview.jpg',
    followers: '103k',
    following: '12',
    photos: '21'
  }
]

function App() {

  return (
    <div style={{ display: "flex", gap: '10px', margin: '10px' }}>
      {cards.map(card => (
        <Card card={card} />
      ))}
    </div>
  )
}

export default App
