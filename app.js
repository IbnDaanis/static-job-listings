const listing = document.querySelector('.listing')

const jobs = async () => {
  const fetchData = await fetch('./data.json')
  const data = await fetchData.json()
  // console.log(data)

  data.forEach(job => {
    let language = ''
    const lang = job.languages.forEach(item => {
      language = `<span class="tag">${item}</span>`
    })
    let tool = ''
    const tools = job.tools.forEach(item => {
      tool = `<span class="tag">${item}</span>`
    })
    const jobItem = `
        <div class="job-item ${job.featured ? `featured-job` : ''}" id="${job.id}">
          <div class="logo">
            <img src="${job.logo}" alt="${job.company} Logo" />
          </div>
          <div class="job-info">
            <div class="company-name">
              <p>${job.company}</p>
              <div class="special-tags">
                ${job.new ? `<span class="new">New!</span>` : ''}
                ${job.featured ? `<span class="featured">Featured</span>` : ''}  
              </div>
            </div>
            <div class="job-title">
              <h2>${job.position}</h2>
            </div>
            <div class="job-meta-info">
              <span>${job.postedAt}</span>
              <span>•</span>
              <span>${job.contract}</span>
              <span>•</span>
              <span>${job.location}</span>
            </div>
          </div>
          <div class="job-tags">
            <span class="tag">${job.role}</span>
            <span class="tag">${job.level}</span>
          ${language}
          ${tool}
          </div>
        </div>
    `

    listing.innerHTML += jobItem

  })


}


jobs()