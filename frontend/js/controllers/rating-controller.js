import { Controller } from '@hotwired/stimulus'

class RatingController extends Controller {
  connect() {
    this.thumbTargets.forEach((target) => {
      target.addEventListener('click', this.handleRatingClick.bind(this))
    })
  }

  handleRatingClick(event) {
    this.ratingValue = event.target.dataset.rating
    this.thumbTargets.forEach((target) => {
      if (this.ratingValue == target.dataset.rating) {
        target.classList.add('fa-solid')
        target.classList.remove('fa-regular')
      } else {
        target.classList.add('fa-regular')
        target.classList.remove('fa-solid')
      }
    })
    gtag('event', 'rating', {
      rating: this.ratingValue,
    })
    this.thankyouTarget.classList.remove('hidden')
  }
}

RatingController.values = {
  rating: Number
}

RatingController.targets = [
  'thumb',
  'thankyou'
]

export { RatingController }
