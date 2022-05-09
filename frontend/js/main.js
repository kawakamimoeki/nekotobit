import { Application } from '@hotwired/stimulus'
import { RatingController } from './controllers/rating-controller'

const app = Application.start()
app.register('rating', RatingController)
