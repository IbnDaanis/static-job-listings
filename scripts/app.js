const listing = document.querySelector('.listing')

const fetchAndDisplayJobs = async () => {
  const fetchData = await fetch('./data/data.json')
  const data = await fetchData.json()
  data.forEach(job => {
    let languages = ''
    job.languages.forEach(item => {
      languages += `<span class="tag">${item}</span>`
    })
    let tools = ''
    job.tools.forEach(item => {
      tools += `<span class="tag">${item}</span>`
    })
    const jobItem = `
        <div class="job-item ${job.featured ? `featured-job` : ''}" id="${
      job.id
    }">
          <div class="logo">
            <img src="${job.logo}" alt="${job.company} Logo" />
          </div>
          <div class="job-info">
            <div class="company-name">
              <p>${job.company}</p>
              <div class="special-tags">
                ${job.new ? `<span class="new">New!</span>` : ''}
                ${
                  job.featured ? `<span class="featured">Featured</span>` : ''
                }  
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
          ${languages}
          ${tools}
          </div>
        </div>
    `
    listing.innerHTML += jobItem
  })

  const filterContainer = document.querySelector('.filter')
  const filterBox = document.querySelector('.filterBox')
  const jobItem = document.querySelectorAll('.job-item')
  let filters = []

  listing.addEventListener('click', e => {
    const target = e.target
    if (target.textContent === 'Clear') {
      filters = []
    }
    if (target.classList.contains('tag')) {
      const filterParameter = target.textContent
      if (!filters.includes(filterParameter)) {
        filterContainer.classList.remove('invisible')
        filters.push(filterParameter)
      } else {
        const index = filters.indexOf(filterParameter)
        if (index > -1) {
          filters.splice(index, 1)
        }
      }
    }
    if (filters.includes(target.dataset.tag)) {
      const filterParameter = target.dataset.tag
      console.log(filterParameter)
      if (filters.includes(filterParameter)) {
        const index = filters.indexOf(filterParameter)
        if (index > -1) {
          filters.splice(index, 1)
        }
      }
    }
    ;[...jobItem].forEach(job => {
      if (filters.every(filter => job.textContent.includes(filter))) {
        job.style.display = 'flex'
      } else {
        job.style.display = 'none'
      }
    })
    filterBox.innerHTML = ''
    filters.forEach(filter => {
      const item = `
        <div class="item" data-tag="${filter}">
          <div class="text" data-tag="${filter}">
            <p data-tag="${filter}">${filter}</p>
          </div>
          <div class="x" data-tag="${filter}">
            <img src="./images/icon-remove.svg" alt="Remove Icon" data-tag="${filter}"/>
          </div>
        </div>
        `
      filterBox.innerHTML += item
    })
    if (!filters.length) {
      filterContainer.classList.add('invisible')
    }
  })
}

fetchAndDisplayJobs()
