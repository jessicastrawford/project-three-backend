# SEI Project Three, Away Days.

# Table of contents
* [Project Overview](#project-overview)
* [Brief](#brief) 
* [Technologies Used](#technologies-used)
* [Approach Taken](#approach-taken)
* [Wins](#wins)
* [Challenges](#challenges)
* [Bugs](#bugs)
* [Key Learnings](#key-learnings)
* [Future Content](#future-content-what-would-i-like-to-add-if-i-had-more-time) 

# Project Overview

The app has been deployed with Netlify and Heroku is available [here.](https://away-days-app.netlify.app/)
 
![away_days](https://user-images.githubusercontent.com/83759837/136553381-6a10ed62-1522-428c-ba48-1bb8338139d9.png)

# Brief

* Build a full-stack application creating both the frontend and the backend, using Express API to serve the data from a Mongoose database.
* Developing the frontend with React.js using the created API.
* The API should have multiple relationships and CRUD functionality for at least a couple of models.
* 9 days timeframe.

# Technologies & Frameworks used 

__Frontend__

* HTML5
* CSS3
* JavaScript
* React.js
* Axios
* MapBox
* Cloundanary
* React router dom
* React responsive carousel
* React rating star component 
* React moment

__Backend__ 

* Node.js
* Express
* MongoDB
* Mongoose
* Bcrypt
* Jsonwebtoken
* Development Tools
* Insomnia
* Git & GitHub

__Npm__

* Firefox dev tools
* Trello Board (planning and timeline)
* Excalidraw (planning)

__Deployment__ 

* Heroku 
* Netlify 

# Approach Taken 

* Our first stage was an in-depth plan, where I drew out a detailed plan in Excalidraw. After reflecting on previous projects I wanted to create a highly detailed model, router and controller plan with all functionality documented in a Trello board. 

* We decided early on to keep a high level of communication throughout the project, arranging morning stand-ups and staying on Zoom to one another making ourselves available throughout the day. We used Git and GitHub for version control, however we had some issues during the beginning of the week with merging conflicts so we made a plan to do pushes and pulls all together as a group which then avoided these issues. We delegated the work evenly between us and used Trello to create a to-do list that we would all keep on top of throughout the project.

![Screenshot 2021-10-08 at 13 17 16](https://user-images.githubusercontent.com/83759837/136555414-4014b4df-8fbc-4554-b5f3-daf6ee0bbe4a.png)

![Untitled-2021-08-18-1303(7)](https://user-images.githubusercontent.com/83759837/136555934-3d11eec2-810e-4fdc-a5b2-c2253d049ac9.png)

__Backend__

* We decided we would start on the backend framework together, taking a couple of sections each. I had the responsibility for creating the secure router & routers, helpers, errors and error handlers.

* Once the backend models and routers were up and running we were then able to test our work in Insomnia. I really enjoy working in Insomnia, it’s a great way to ensure your backend code is functioning and working efficiently.

* We built up our backend using Node.js, Express and MongoDB. Having just learnt these languages and frameworks it worked well that we tackled the first stages of the backend together, sharing our knowledge and ideas.

__Frontend__

* Once these were done we split off into our separate sections, Nnanna worked on creating the data models, James worked on the auth and club controllers and I moved across to the frontend. Whilst the data and the controllers were being built I started off by creating the framework of the app, creating the main components and their routes: Home, Register, Login, Index, View, Footer and About. Having the in-depth drawing plan in Excalidraw made this process fast and efficient.

* Once the data had been completed and seeded we were then able to start implementing our data using React. I set about building the homepage with a hero image carousel, a top 5 rated pubs and a sign up section. I experimented with the framework, Materialize but found I came across a couple of issues with it so left it and decided to create the styling myself. Issues oddly included that my laptop all of a sudden started to work slowly and crash. I found myself later down the line having to uninstall Materialize and rebooting my package.json file, which resolved my issues. I took a lot of inspiration from the AirBnB website for their clean, fresh feel. With the idea of curved buttons, images and grid layouts.


![Screenshot 2021-10-08 at 13 29 00](https://user-images.githubusercontent.com/83759837/136556922-3f0f9689-e229-4563-abc8-d1e80949101f.png)

* For the carousel, I experimented with a few different frameworks and npm packages, including react-responsive-carousel, materialize carousel and react-alice-carousel. I chose react-alice-carousel as I liked how you could control the automatic time interval between each slide and that the user also had the option to slide to the next photo if they wanted to.

* One of the first things that sprung to mind when we first spoke about creating a football themed website was that it was the perfect time to experiment with a bouncing football animation. The initial idea behind this animation was to have the ball bouncing when the page was loading (as the loading spinner). We didn’t get round to implementing a loading function into the code so I incorporated it into the login and register pages.

![registerpage](https://user-images.githubusercontent.com/83759837/136560056-42675bb3-ff63-40ba-8e56-a736aff0b449.gif)

* I started off by creating the box and within that the ball and its shadow.

```javascript
function Loading() {
  return (
    <section className="box">
      <div className="shadow"></div>
      <div className="gravity">
        <div className="ball"></div>
      </div>
    </section>
  )
}

export default Loading
```

* I then experimented in CSS to create the animation. I knew that I wanted the ball to rotate whilst it bounced, resulting in it having two animations. This is why I wrapped the ball inside another div and gave it a class of gravity which is where I added the bouncing animation, adding the rotation animation to the ball itself. After experimenting bouncing the ball along the x-axis, with ease-in I realised it wasn’t as smooth as I hoped, this is where I discovered and experimented with the transition function, cubic-bezier.

```javascript
.box {
  margin: 0 auto;
  width: 40px;
  height: 140px;
  position: relative;
 
  .shadow {
    position: absolute;
    width: 100%;
    height: 10px;
    background-color: grey;
    bottom: 0;
    border-radius: 100%;
    transform: scaleX(.8);
    opacity: .6;
    animation: shadowScale 1s linear infinite;
  }

.gravity {
  width: 10px;
  height: 10px;
  animation: bounce 1s cubic-bezier(0.68, 0.35, 0.29, 0.54) infinite;
}
.ball {
  width: 40px;
  height: 40px;
  background-image: url('https://image.flaticon.com/icons/svg/33/33736.svg');
  background-size: cover;
  animation: roll .6s linear infinite;
}
}
```

* The next stage was to work on the club and pub show pages, using useEffects to receive the single club or pub and their ratings. On the club page I added a three image hero grid layout along with the logo, information about the club and stadium and a nearby pubs section, whilst Nnanna worked hard on adding in the map features. The nearby pub cards are clickable which take you to their show page. Included on this page are the pub's ratings and comments.

* This was where I experimented with the package, react-star-rating-component.

```javascript
<div className="admin-rating">
        <h3>Ratings...</h3>
        <hr/>
        <ReactStars
          count={5}
          size={20}
          half={false}
          value={userRating}
          emptyIcon={<i className="far fa-star"></i>}s
          fullIcon={<i className="fa fa-star"></i>}
          edit={false}
          starColor={'red'}
        />
        <p>{description}</p>
      </div>
```
```javascript
<form className="user-reviews">
          <h3 className="review-title">Write Your Own Review...</h3>
          <hr/>
          {isClicked && isAuthenticated && <>
            <div className="user-star-ratings">
              {/* <div>
                <label>Rating:</label>
              </div> */}
              <div className="stars">
                <ReactStars
                  count={5}
                  size={20}
                  half={false}
                  name="rating"
                  value={parseInt(rating.nextValue)}
                  onStarHover={handleRating}
                  fullIcon={<i className="fa fa-star"></i>}
                  emptyIcon={<i className="far fa-star"></i>}
                />
                {errors.rating && <p className="help is-danger">Rating is required</p>}
              </div>
            </div>
            <textarea
              className="textarea"
              name="text"
              value={formData.text}
              onChange={handleChange}
              placeholder="Add your review here.."
            />
            {errors.text && <p className="help is-danger">Comment is required</p>}
           </>}
        </form>
```

* I then tackled the user review and commenting, which unfortunately I had run out of time to complete during the project timeframe. I got as far as the user being able to add their comment and star rating, by creating a handleChange and handleRating function which picked up what the users rating and text input.

```javascript
  const handleChange = (e) => {
    e.preventDefault()
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log(formData)
    // setFormErrors({ ...formErrors, [e.target.name]: '' })
  }
```
```javascript
  const handleRating = (nextValue) => {
    setRating({ nextValue })
    console.log(nextValue)
    console.log(rating)
    setFormData({ ...formData, rating: rating.nextValue  })
  }
```

* I nearly finished my handleSubmit function by getting as far as receiving the windows notification with the users finished review. Since this and completing project 4, understanding how comments and ratings work a lot more I have been able to quickly add in a couple extra lines to finish off this bit of code and enable comments to work. Setting the setFormData text back to an empty string enabled the comment to disappear from the input box once it has been submitted. 


```javascript
  const handleSubmit = async (e, nextValue) => {

    e.preventDefault()

    try {
      setRating({ nextValue })
      await createAComment(clubId, pubId, formData) 
      const reviewsWithAddedReview = await getAllComments(clubId, pubId)
      setPubReviews(reviewsWithAddedReview.data)
      setFormData( { text: '' })
      if (!isAuthenticated) throw new Error
    } catch (err){
      console.log(err)
      setErrors(true)
    }
  }
```
```javascript
  const handleDeleteComment = async (e) => {
    e.preventDefault()
    try {
      const commentId = e.target.name
      console.log(comment)
      await deleteAComment(clubId, pubId, commentId)
      const res = await getAllComments(clubId, pubId)
      setComment(res.data)
      history.push(`/clubs/${clubId}/pubs/${pubId}/`)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }
```

* Unfortunately we didn’t have a username in the comments object, therefore if we were to have had a little more time I would have liked to have gone back and added a addedByUsername into the backend commentSchema to add a name rather than a number to the comment.

```node
const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, maxlength: 350 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
)
```

* The remainder of the project I spent finalising all the styling for each page, ensuring it looked high quality and consistent throughout. 

# Wins

Creating a toggle for the login and register password was a fun win, and gave our website a more professional feel. I achieved this toggle by setting into state a boolean that is evoked by an onClick event. 

```javascript
  const [passwordShown, setPasswordShown] = React.useState(false) 
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true)
  }
```
# Challenges 

One thing I found challenging was that I had created a pubCard which was used on both the club show page and also on the homepage. My initial mindset was that I thought by having just one card for them they would look consistent throughout the site, however I quickly discovered whilst working in CSS that I had overcomplicated things for myself as I didn’t always want the exact same styling. Even though I wanted them to look the same, with them being on different pages they required different layouts.

# Bugs

The React Star Rating component is a little buggy, sometimes you have to double click in order for it to pick up the users click.
It’s not so much a bug but I would have liked to have added the feature where the user was prompted to add in their postcode rather than a longitude and latitude, and this was then converted to the appropriate values needed for Mapbox. 

# Key Learnings

This was a great project to learn the key skills required to work efficiently within a team. I learnt valuable communication skills to collaborate and git merge effectively, having good communication with one another enabled us to avoid major merging conflicts. 
Another win that I am hugely inspired by is that even when the content I am creating isn’t my main interest I thoroughly enjoyed the project. Football isn’t something I am necessarily interested in but creating this website was a lot of fun. 

# Future Content: What would I like to add if I had more time

In the planning stages I looked into the football video API, ScoreBat which includes embedded code for goals and highlights from matches. I thought this would be a great addition to add into the clubs show pages. However upon realising that this was a bigger job than I initially thought and given our timeframe, I didn’t get round to adding this function in. 

During the planning stages we spoke about adding in an interactive map page that would include clickable pub and club icons positioned in their location, taking you to their given show page. We didn’t get round to adding in this page however I would like to have a play with Mapbox and add this feature in the future. 
