import React from 'react';
import "./JobPosts.css";


const JobPosts = () => {
  return (
    // parent container - center everything 
    <div className='container-fluid' id="jobPosts">

      {/* // section 1 - your matches  // */}
        <div className='row my-3'>
          <div>Your Matches</div>
          <div className='col-4'>
            <p>Job 1</p>
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <button type="button" class="btn btn-primary">Button</button>
              </div>
            </div>
          </div>
        

          <div className='col-4'>
            <div>
            <p>Job 2</p>
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <button type="button" class="btn btn-primary">Button</button>
                </div>
              </div>
            </div>
          </div>

          <div className='col-4'>
            <div>
            <p> Job 3 </p>
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <button type="button" class="btn btn-primary">Button</button>
                </div>
              </div>
            </div>
        </div>

        <hr class="hr hr-blurry my-3" />

      {/* Section 2 -- Local jobs (NYC) */}
        <div className='row my-3'>
        <div>Local jobs</div>
          <div className='col-4'>
            <p>Job 1</p>
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <button type="button" class="btn btn-primary">Button</button>
              </div>
            </div>
          </div>
        

          <div className='col-4'>
            <div>
            <p>Job 2</p>
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <button type="button" class="btn btn-primary">Button</button>
                </div>
              </div>
            </div>
          </div>

          <div className='col-4'>
            <div>
            <p> Job 3 </p>
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <button type="button" class="btn btn-primary">Button</button>
                </div>
              </div>
            </div>
        </div>
        </div>


    </div>
 </div>
  )
}

export default JobPosts
