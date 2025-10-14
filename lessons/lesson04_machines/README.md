# Lesson 04 – Drawing Machines

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

Use code to create tools that generate or transform drawings.

## ⏰ Content

### Brief

**Write a program** that expands, augments, distorts, questions, complicates, interprets, or improves the act of drawing. Your code should behave like a machine - with its own rules, behaviors, and character. Explain what your system is about: is it a tool? A statement? A game? Use your tool to **create your original series of at least 3 drawings.** [^note-id1]

> **Note:** This is a coding assignment. You are not building a physical machine - you are simulating one through code. Think of how a plotter, a spirograph, or a pendulum creates marks, then recreate that logic programmatically.

You do not have to draw your idea on paper first but sketching some ideas on paper is recommended ;)

### Variations / Steps [^note-id1]

- [ ] Bring your drawing to life
- [ ] Forget about your right or left hand, how else can you draw something?
- [ ] Create a machine that requires more than 1 user to be operated
- [ ] Make a single purpose drawing machine (a machine that only draw ducks)
- [ ] Identify and challenge some other assumptions about drawing, for example:
  - Drawings are made of flat surface
  - Drawings is meant to endure
  - Drawings can be finished
  - etc...
- [ ] Make a tool that functions critically. For instance that rejects the tech imperative of accuracy, realism, utility and instead focus on expressivity, irreproducibility, etc...

## Deliverables

- 3 drawings
- Code and documentation of your process, add some live example + gifs / images.
- Include a scan or photo of your drawings in the post

## More on drawing machines

### What is a "drawing machine" in code?

A drawing machine is a **system with rules** that creates marks. Instead of you directly controlling every line, you define the logic and let the system execute it. Think of it as creating a virtual mechanism that has its own way of making marks.

#### The key shift in thinking:

- **Traditional drawing:** You control the pen directly, making each mark intentionally
- **Drawing machine:** You design a system that makes marks according to rules, behaviors, and inputs you define

#### Core components to consider:

**1. Behaviors (Movement & Logic)**
How does your machine move? What patterns or algorithms govern its motion?

- Oscillation (pendulum swings, sine waves)
- Orbital motion (circles, spirals, lissajous curves)
- Random walks or noise-based movement
- Physics simulation (gravity, velocity, acceleration)
- Following mathematical formulas

**2. Inputs (What drives the machine?)**
What information does your machine respond to?

- Mouse position and movement
- Keyboard input
- Time (constant animation)
- Random values
- External data (weather, sound, text)
- Previous marks (drawing influences future drawing)

**3. Constraints (The machine's character)**
What limitations or rules shape the output?

- Speed limits or friction
- Boundaries (bounce off edges, wrap around)
- Distance rules (stay close to mouse, avoid other elements)
- Probability (maybe draw, maybe don't)
- Memory limits (fade old marks, remember only last N positions)

**4. Mark-making rules**
How and when does your machine leave traces?

- Continuous line vs. discrete marks
- Conditional drawing (only when moving fast, only on certain areas)
- Varying visual properties (color, weight, opacity based on speed/position)
- Multiple drawing agents working simultaneously
- Accumulation over time

#### Concrete examples of machine-like behaviors:

**Simple:** A circle follows your mouse with a slight delay, leaving a trail as it moves.  
**Medium:** Two points connected by a line. One follows the mouse, the other oscillates around it. The line thickness changes based on the distance between them.  
**Complex:** A system of particles that are attracted to your mouse but repel each other. Each particle draws a line as it moves, and the color shifts based on its velocity.  
**Conceptual:** A drawing tool that "misunderstands" your input - it draws what it thinks you meant to draw, not what you actually drew.

#### Questions to help you design your machine (could be used as journaling questions as well):

- If your code was a physical mechanism, what would it look like? How would it move?
- What makes your machine different from just drawing with your mouse?
- What can your machine do that you couldn't easily do by hand?
- What personality or character does your machine have? (precise? chaotic? stubborn? collaborative?)

### References

The examples below show physical and robotic drawing machines for inspiration. **Your task is to capture similar concepts in code** - think about the logic, movement, and mark-making strategies these machines use, then program your own version.

!['Your unpredictable sameness'](images/oe_01.jpg)  
[_Your unpredictable sameness, Studio Olafur Eliasson, 2014_](https://olafureliasson.net/archive/artwork/WEK108972/your-unpredictable-sameness#slideshow)

!['OE drawing machines'](images/oe_02.jpg)  
[_Olafur Eliasson drawing machines_](https://olafureliasson.net/tag/TEL3158/drawing-machines)

!['Cameron Robbins wind drawing machines'](images/cr_wd.jpg)  
[_Cameron Robbins wind drawing machines_](http://cameronrobbins.com/wind-drawings/)

The Wind Drawing Machines are installed in different locations to receive weather energy and translate it into an abstract format of ink drawings on paper.

!['Toy Robot, 2019'](images/pt.jpg)  
[_Patrick Tresset - Toy Robot, 2019_](https://patricktresset.com/new/project/toy-robot-2019/)

Patrick Tresset is a Brussels-based artist who, in his work, explores human traits and the aspects of human experience. His work reflects recurrent ideas such as embodiment, passing time/time passing, childhood, conformism, obsessiveness, nervousness, the need for storytelling, and mark-making. He is best known for his performative installations using robotic agents as stylized actors that make marks and for his exploration of the drawing practice using computational systems and robots. ([youtube channel](https://www.youtube.com/c/PatrickTresset/videos))

{% raw %}

<iframe src="https://player.vimeo.com/video/19372180?h=c2c7041188&color=ffffff&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
<p><a href="https://vimeo.com/19372180">Conductor: www.mta.me</a> from <a href="https://vimeo.com/alexanderchen">Alexander Chen</a> on <a href="https://vimeo.com">Vimeo</a>.</p>  
{% endraw %}

At www.mta.me, Conductor turns the New York subway system into an interactive string instrument. Using the MTA's actual subway schedule, the piece begins in realtime by spawning trains which departed in the last minute, then continues accelerating through a 24 hour loop. The visuals are based on Massimo Vignelli's 1972 diagram. ([Alexander Chen](https://www.chenalexander.com/))

!['Sloppy Forgeries'](images/sf.png)  
[_Sloppy Forgeries - Jonah Warren_](http://playfulsystems.com/sloppy-forgeries/)

Sloppy Forgeries is a fast-paced, two-player local multiplayer painting game. Each player is given a mouse, a blank canvas, and a few simple paint tools. Each round, a famous painting from art history is revealed. Players race to copy the painting as quickly and accurately as possible.

!['Sougwen Chung - Artefacts'](images/sw.jpg)  
[_Sougwen Chung - Artefacts_](https://sougwen.com/project/artefact1)

Artefact 1 explores artistic co-creation and is the outcome of an improvisational drawing collaboration with a custom robotic unit linked to a recurrent neural net trained on my drawings. The contrasting colors of lines denote those marks made by the machine and my own hand. This work is the latest in an ongoing series of Drawing Operations begun in 2014.

!['Do not!'](images/doodle_penis_ai.gif)  
[_Do not draw a penis - Studio Moniker_](https://studiomoniker.com/projects/do-not-draw-a-penis)

Do Not Draw a Penis functions as an agent to collect inappropriate doodles from people who are not willing to stay within the moral guidelines set by our social network providers.

> You will find code examples in the book [Generative Gestaltung (P_2_2_6)](http://www.generative-gestaltung.de/2) <br>
> Check :sparkles: [Pinterest Drawing machine board](https://www.pinterest.ch/9uill0m/generative-class/dawing-machines/) <br> _(temp pinterest account: tmp.pin@gmail.com / TT4[bosses )_ <br> > [Pinterest drawbots](https://www.pinterest.co.uk/gonzillaaa/drawbots/)

### Example

{% raw %}

<iframe src="https://preview.p5js.org/guma/embed/gJAZwbKlG" width="100%" height="450" frameborder="no"></iframe>  
{% endraw %}

[Lisajou in P5.js](https://editor.p5js.org/guma/sketches/gJAZwbKlG)

{% raw %}

<iframe src="https://preview.p5js.org/guma/embed/E4Qwdkb4Z" width="100%" height="450" frameborder="no"></iframe>  
{% endraw %}

[Lerp and delay in P5.js](https://editor.p5js.org/guma/sketches/E4Qwdkb4Z)

### :books: Resources

- [Wiki - Lisajou curves](https://en.wikipedia.org/wiki/Lissajous_curve)
- [Coding Challenge - Drawing with Fourier Transform and Epicycles](https://www.youtube.com/watch?v=MY4luNgGfms)
- [3Blue1Brown - But what is the Fourier Transform?](https://www.youtube.com/watch?v=spUNpyF58BY)
- [Coding Challenge #159: Simple Pendulum Simulation](https://www.youtube.com/watch?v=NBWMtlbbOag)
- [Coding Challenge - Double Pendulum](https://thecodingtrain.com/CodingChallenges/093-double-pendulum.html)
- [A trick to get looping curves with lerp and delay](https://necessarydisorder.wordpress.com/2018/03/31/a-trick-to-get-looping-curves-with-lerp-and-delay/)
- [Not about drawing machines, but cool](https://www.dataisnature.com/)

## Wrap-Up & Homework

- Summarize key learnings.
- Add to your journal

## 📝 Activities

- Introduce concept of drawing machines with examples.
- Code: build a drawing machine program.
- Produce at least 3 drawings from it.

## 📂 Deliverables

- Code + 3 outputs.
- Documentation (images/gifs + reflection).

## 📓 Journal Prompts

- How is your machine "expressive" rather than "functional"?
- What limitations or constraints shaped your outcome?

## 🎨 References & Inspiration

- Olafur Eliasson, drawing machines
- Jean Tinguely, mechanical drawing

[^note-id1]: [Code as Creative Medium - Tega Brain / Golan Levin](https://mitpress.mit.edu/books/code-creative-medium)
