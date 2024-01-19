export const LandingPage = () => {
  return (
    <>
      <div class="px-4 py-5 my-5 text-center">
        <img class="d-block mx-auto mb-4" src="./src/assets/logo_2.png" alt=""></img>
        <h1 class="display-5 fw-bold text-body-emphasis">Tracky</h1>
        <div class="col-lg-6 mx-auto">
          <p class="lead mb-4">Embark on a journey of self-improvement with Tracky, the ultimate habit-tracking experience designed to empower you to build positive routines and achieve your goals.</p>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type="button" class="btn btn-primary btn-lg px-4 gap-3">Primary button</button>
            <button type="button" class="btn btn-outline-secondary btn-lg px-4">Secondary</button>
          </div>
        </div>
      </div>

      <div class='text-start'>
      <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <div class="col d-flex align-items-start">
        <div class="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
        📅
        </div>
        <div>
          <h3 class="fs-2 text-body-emphasis">Calendar Heatmap</h3>
          <p>Visualize your habits with our intuitive calendar heatmap, inspired by GitHub's contribution tracker. Effortlessly track your progress and identify trends over time.</p>
          <a href="#" class="btn btn-primary">
            Primary button
          </a>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <div class="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
        🌈
        </div>
        <div>
          <h3 class="fs-2 text-body-emphasis">Customizable Colors</h3>
          <p>Make habit tracking a vibrant and personal experience by choosing colors that resonate with you. Each color represents a unique habit, turning your calendar into a canvas of accomplishments.</p>
          <a href="#" class="btn btn-primary">
            Primary button
          </a>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <div class="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
        🚀
        </div>
        <div>
          <h3 class="fs-2 text-body-emphasis">Easy-to-Use Interface</h3>
          <p>Our user-friendly design ensures a seamless experience. Set up your habits in minutes, log your achievements effortlessly, and stay motivated with a glance at your personalized calendar.</p>
          <a href="#" class="btn btn-primary">
            Primary button
          </a>
        </div>
      </div>
    </div>
      </div>
    </>
  )
}