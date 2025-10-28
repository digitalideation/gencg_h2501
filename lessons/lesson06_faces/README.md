# Lesson 06 – Faces / Parametric Generators

## Schedule

| Time          | Desc                          |
| ------------- | ----------------------------- |
| 00:00 – 00:15 | [Intro](#brief)               |
| 00:15 – 00:30 | Sharing                       |
| 00-30 - 01:00 | [Work on assignement](#brief) |
| 01:00 - 01:10 | [Break](#-break)              |
| 01:15 - 02:00 | [Work on assignement](#brief) |
| 02:00 - 02:15 | [Wrap up](#wrap-up--homework) |

## 🎯 Focus

Explore parametric design by generating faces through code.

## ⏰ Content

## 😐 Face Generator

### Brief

**Write a program** that generates parametric faces. Your face should be controlled by at least 3 parameters but preferably more. Variations in some of the features can be used to control the expressiveness of the face or some other characteristics (species, gender, age, mood, etc…) Differentiate continuous parameters (size and position of features) and discrete parameters (piercing, number of eyeballs). Consider the space you're generating your face in (2D / 3D) and the view angle: front, profile, 3/4?

> **Note:** This is a coding assignment. You are building a system that can generate infinite variations of a face by changing parameters (variables in your code). Think of it like designing a character creation system in a video game - sliders and options that produce different faces.

**You must first sketch your idea on paper before working with the software.**

### What is a "parametric face"?

A parametric face is a face designed through **variables** rather than fixed values. Instead of drawing one specific face, you're creating a **system that can generate many faces** by adjusting parameters.

#### The key concept:

**Traditional approach:** Draw a face with specific features (eyes at position x, nose size y, mouth width z)

**Parametric approach:** Define features as variables that can change:
```
eyeSize = variable (can be 20 to 60)
eyeSpacing = variable (can be 30 to 100)
noseLength = variable (can be 10 to 40)
```

Change these variables → get a different face. Every time.

#### Types of parameters:

**Continuous parameters** (smooth transitions)
- Eye size: 10 → 20 → 30 → 40 (gradual change)
- Mouth width: 50 → 75 → 100 (smooth scaling)
- Head shape: round → oval → elongated
- Feature positions and proportions

**Discrete parameters** (distinct options)
- Number of eyes: 1, 2, 3, or 4 (not 2.5!)
- Eye shape: circles, rectangles, or triangles
- Accessories: glasses (yes/no), hat (yes/no), piercings (0, 1, or 2)
- Expression presets: happy, sad, angry, surprised

#### How to think about building it:

**1. Start with the basics**
- What are the essential elements? (head shape, eyes, nose, mouth)
- What should be variable vs. fixed?

**2. Define your parameters**
- List 3-5 key variables that will create variety
- Decide their ranges (min/max values)
- Consider how they relate to each other (do bigger eyes mean wider eye spacing?)

**3. Build incrementally**
- Start with one element (e.g., just the head)
- Add one parameter at a time
- Test the range - does it create interesting variation or just look broken?

**4. Add personality**
- How do your parameters affect expression/character?
- Can you create a "mood" parameter that affects multiple features?
- What makes your faces feel cohesive despite variation?

#### Concrete examples:

**Simple face system:**
```
- headSize: 100-300
- eyeHeight: 0.3-0.5 (fraction of head height)
- eyeSpacing: 0.3-0.7 (fraction of head width)
```

**More complex system:**
```
- age: 0-100 (affects multiple features: wrinkles, eye droop, head shape)
- mood: -1 to 1 (negative = sad, positive = happy, affects mouth curve, eyebrow angle)
- species: "human", "alien", "robot" (completely changes available features)
```

#### Questions to guide your design:

- What is the "identity" of your face system? (realistic? abstract? geometric? organic?)
- Which parameters create the most dramatic changes?
- Which parameters are subtle but important for personality?
- How many unique faces can your system generate? (hint: multiply your parameter options)
- Can someone recognize that two different outputs came from the same system?

### Variations / Steps

- [ ] Bring your face to life (animate parameters over time)
- [ ] Try using real world data as input (weather, time, sound levels control parameters)
- [ ] Generate a collection (prints, cards) from your face generator
- [ ] Add user controls (sliders, buttons) to adjust parameters in real-time
- [ ] Create "presets" (specific parameter combinations that create interesting characters)

## Deliverables

- Code and documentation of your process, add some live example + gifs / images.
- Include a scan or photo of your paper sketches in the post
- Show at least 3-5 different faces generated from your system

## More on Face Generator

### References

The examples below show various approaches to face generation - some computational, some using AI, some interactive. **Your task is to create a parametric system using code** where you define the rules and parameters that generate the faces.

!['Weird Faces - Matthias Dörfelt'](images/weird_faces.jpg)  
[_Weird Faces - Matthias Dörfelt_](https://www.creativeapplications.net/featured/weird-faces-study-by-matthias-dorfelt-using-paperjs/)

Computer generated images have a certain aesthetics to them that make them immediately recognizable as such by the trained eye. Weird Faces is an attempt to combine my old interest in illustration with programing, to create something procedural that has a truly individual artistic touch to it and is not instantly recognizable as a generative art piece. Even though, the faces look hand-drawn, they are entirely expressed by algorithmic rules. Each face is random, each face is unique. Still, they look similar to my actual hand drawn faces.

!['Strange Visions'](images/stranger_visions.jpg)  
[_Strange Visions - Heather Dewey-Hagborg_](https://deweyhagborg.com/projects/stranger-visions)

In Stranger Visions Heather collected hairs, chewed up gum, and cigarette butts from the streets, public bathrooms and waiting rooms of New York City. She extracted DNA from them and analyzed it to computationally generate 3d printed life size full color portraits representing what those individuals might look like, based on genomic research.

![Lenny Face Generator](images/lenny.jpg)  
[_Lenny Face Generator_](https://lenny-face-generator.textsmilies.com/)

![Jabba](images/jabba.jpg)  
[_Pareidolia_](https://www.reddit.com/r/Pareidolia/)

Pareidolia is the tendency for perception to impose a meaningful interpretation on a nebulous stimulus, usually visual, so that one sees an object, pattern, or meaning where there is none.

![Ig](images/ig.jpg)  
[_> source_](https://www.instagram.com/p/CUqCDq8Jpff/)

!['Mas que la cara'](images/mas.jpg)  
[_Mas que la cara - Zach Lieberman_](https://zachlieberman.medium.com/m%C3%A1s-que-la-cara-overview-48331a0202c0)

Mas que la Cara is a public art installation in Downtown Houston which augments participants faces with dynamically generated masks that respond to their movements.

!['Face Trade'](images/face_trade.jpg)  
[_Face Trade - Matthias Dörfelt_](https://www.creativeapplications.net/c/face-trade-art-vending-machine-that-trades-mugshots-for-free-portraits/)

Face Trade is an Art Vending Machine created by Matthias Dörfelt that dispenses unique prints of computer generated face drawings. Instead of paying with money, buyers trade a mugshot that is taken on the spot in order to be permanently stored in the Ethereum Blockchain, consequently turning the transaction into a semi-permanent Face Swap.

!['Type Face'](images/typeface01.png)  
[_Type Face -Mary Huang_](http://www.creativeapplications.net/processing/typeface-processing/)

Created by Mary Huang, TYPEFACE is a study of facial recognition and type design, creating a typeface that corresponds to each individual, like a typographic portrait. Somewhat similar to LAIKA project – interactive typeface, the challenge here were the limitations of geometric type system, being able to allow for a great amount of variation while maintaining a general level of quality in the letters.

{% raw %}
<iframe src="https://player.vimeo.com/video/69694262?h=edd986e6e2" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
<p><a href="https://vimeo.com/69694262">Drawing faces instructed by facial recognition</a> from <a href="https://vimeo.com/user8828003">M Plummer-Fernandez</a> on <a href="https://vimeo.com">Vimeo</a>.</p>  
{% endraw %}

!['Deep Privacy'](images/deep_privacy.gif)  
[_Deep Privacy - Hukkelas, Hakon and Mester, Rudolf and Lindseth, Frank_](https://github.com/hukkelas/DeepPrivacy)

{% raw %}
<iframe src="https://player.vimeo.com/video/29348533?h=5c0cc36b58&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
<p><a href="https://vimeo.com/29348533">Face Substitution</a> from <a href="https://vimeo.com/kylemcdonald">Kyle McDonald</a> on <a href="https://vimeo.com">Vimeo</a>.</p>  
{% endraw %}

See also other [similar](https://www.creativeapplications.net/sound/faceshift-studio-experiments-by-kyle-mcdonald/) / [experiments](https://www.creativeapplications.net/openframeworks/scramble-suit-face-tracking-openframeworks/) by Kyle

### Example

![Ig](images/facemesh.jpg)  
[Mediapipe Facemesh in P5.js](https://editor.p5js.org/guma/sketches/IAlxLpyRd)

## Wrap-Up & Homework

- Summarize key learnings.
- Add to your journal

## 📝 Activities

- Paper sketching of parametric faces.
- Code: build a face generator with ≥3 parameters.
- Experiment with discrete and continuous variables.

## 📂 Deliverables

- Face generator program + multiple outputs.
- Sketches and documentation.

## 📓 Journal Prompts

- Which parameters most affect "personality"?
- How does abstraction influence recognition?
- What's the minimum information needed to recognize a face?

## 🎨 References & Inspiration

- Matthias Dörfelt, Weird Faces
- Heather Dewey-Hagborg, Stranger Visions