# Week 4

## Clock / Time

### Lesson 3: Clock / Time

In this lesson, we explored the concept of time as a design material in generative systems. We learned how to visually and conceptually represent time, considering both linear and cyclical models of time, and how to map time variables to visual elements.

**Key Concepts:**
- Linear vs. cyclical time representation
- Time as an abstract concept in art
- Biological, celestial, and psychological time
- Mapping time variables to visual properties
- Creating time-based animations and clocks

**Design Challenge:**
Build a device visualizing the passing of time that is abstract enough to appear different at all times of the day, incorporates cycles, and avoids using letters and digits unless conceptually relevant.

### Exercise 1: Simple Digital Clock (Minimal Code)

This is a minimalist digital clock created with **JavaScript** using **p5.js**. The goal was to represent time in its most basic form using minimal code (under 25 lines).

**How it works:**
- Uses p5.js's built-in `hour()`, `minute()`, and `second()` functions to get current time
- Formats time as HH:MM:SS using the `nf()` function for zero-padding
- Displays time in green text (reminiscent of classic digital displays) on black background
- Updates every frame to show live time
- Represents **linear time** - past is over, present is now, future is ahead

This exercise demonstrates how time can be represented digitally with very simple code, focusing purely on functionality rather than aesthetic complexity.

{% raw %}
<iframe src="../content/day01/07/embed.html" width="100%" height="350" frameborder="no"></iframe>
{% endraw %}

### Exercise 2: Classic Analog Clock (Complex)

This is a more complex visualization representing **cyclical time** through a traditional analog clock design. The code demonstrates advanced p5.js techniques including trigonometry, coordinate transformations, and layered visual elements.

**How it works:**
- Clock face with 12 hour markers (thick lines) and 60 minute markers (thin lines)
- Three rotating hands representing hours, minutes, and seconds
- Hour hand (red) rotates slowly, influenced by both hours and minutes
- Minute hand (blue) rotates based on minutes and seconds
- Second hand (yellow) moves continuously around the circle
- Uses `angleMode(DEGREES)` and trigonometric functions (`cos()`, `sin()`) to position elements
- Demonstrates **cyclical time** - continuous, repeating, infinite
- Live animation shows the passage of time in real-time

The analog clock represents time as a cycle rather than a line, emphasizing the repeating nature of days, hours, and minutes. The smooth movement of the hands creates a meditative quality, different from the digital clock's discrete jumps.

{% raw %}
<iframe src="../content/day01/08/embed.html" width="100%" height="650" frameborder="no"></iframe>
{% endraw %}

### Reflection

These two clocks represent contrasting philosophies of time:

**Digital Clock (Linear Time):**
- Precise, discrete, quantified
- Forward-moving progression
- Modern, digital age perspective
- Time as numbers and measurements

**Analog Clock (Cyclical Time):**
- Continuous, flowing, repeating
- Circular understanding of time
- Traditional, natural cycles (day/night, seasons)
- Time as movement and rhythm

Creating both helped me understand how the same concept (time) can be represented in fundamentally different ways, each revealing different aspects of how we experience and conceptualize time. The code complexity also differs significantly - simple linear representation requires minimal code, while cyclical representation with smooth animations requires more sophisticated trigonometry and coordinate transformations.
