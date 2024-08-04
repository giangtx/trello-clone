const Home = () => {
  return (
    <div className="page home-page">
      <div className="flex home-container">
        <div className="w-[70%] home-item">
          <h1>Trello helps teams move work forward.</h1>
          <p className="w-[50%]">Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique - accomplish it all with Trello.</p>
        </div>
        <div className="w-[30%] home-item">
          <img src="https://trello-clone-one.vercel.app/homepage/home-illustration.svg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;