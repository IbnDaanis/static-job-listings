const listing = document.querySelector('.listing')

const jobs = async () => {
  const fetchData = await fetch('./data.json')
  const data = await fetchData.json()
  // console.log(data)

  data.forEach(job => {
    let language = ''
    job.languages.forEach(item => {
      language = `<span class="tag">${item}</span>`
    })
    let tool = ''
    job.tools.forEach(item => {
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

  const filterContainer = document.querySelector('.filter')
  const filterBox = document.querySelector('.filterBox')
  const job = document.querySelectorAll('.job-item')
  let filters = []

  listing.addEventListener('click', e => {
    const target = e.target

    if (target.textContent === 'Clear') {
      filters = []
    }
    if (target.classList.contains('tag')) {
      const filterParam = target.textContent
      if (!filters.includes(filterParam)) {
        filterContainer.classList.remove('invisible')
        filters.push(filterParam)
      } else {
        const index = filters.indexOf(filterParam)
        if (index > -1) { filters.splice(index, 1) }
      }
      console.log(filters)
    }

    if (filters.includes(target.dataset.tag)) {
      const filterParam = target.dataset.tag
      console.log(filterParam)
      if (filters.includes(filterParam)) {
        const index = filters.indexOf(filterParam)
        if (index > -1) { filters.splice(index, 1) }
      }
    }

    [...job].forEach(j => {
      if (filters.every(filter => j.textContent.includes(filter))) {
        j.style.display = 'flex'

      } else {
        j.style.display = 'none'
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
    if (!filters.length) { filterContainer.classList.add('invisible') }
  })
}


jobs()