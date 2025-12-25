# Week 1 & 2

## Journal Entry

### Lesson 1 & 2 ( Intro & Foundation )

Brief Summary of What We Learned in Week 1 (GCG – Lesson 01)

In the first week, I was introduced to Generative Computer Graphics (GCG), its philosophy, and how rules, randomness, and iteration shape generative art.
I explored historical pioneers like Malevich, Klee, Molnár, Nees, and learned how analog systems (e.g., Sol Lewitt’s wall drawings) relate to computational thinking.
I practiced "computing without computers" through procedural drawings and rule-based systems.
I learned how to set up our GitHub repository, clone it, and create the journal/ branch for documentation.
I were introduced to p5.js, prepared our local setup, and learned the academic journal workflow (adding images, code snippets, and reflections).
Finally, we discussed how to ask for help, pair programming, peer learning, and expectations for sharing content in the class.

The below generated art cube implements an anaglyph stereoscopic rendering system in p5.js, which creates a red–cyan 3D effect by rendering a scene from two slightly offset virtual cameras. The left and right views are combined using a custom shader to simulate depth perception when viewed with anaglyph glasses. I included this example in my journal after finding it online and implementing it with guidance from my professor. The purpose is not originality, but to demonstrate the technical and creative possibilities of generative computer graphics, particularly how mathematical camera manipulation and shaders can expand visual perception beyond standard 2D rendering.

{% raw %}
<iframe src="../content/day01/03/embed.html" width="100%" height="450" frameborder="no"></iframe>
{% endraw %}

**Procedural Drawing Exercise:** This simple 8x8 grid drawing was generated using **JavaScript** with the **p5.js** library. Inspired by Sol LeWitt's wall drawings, it follows procedural rules: each cell randomly contains either a circle or square, with random colors selected from a limited palette (red, blue, yellow, green, black) and varying sizes. Click anywhere to regenerate a new pattern, demonstrating how algorithms and randomness can create unique visual outcomes from the same set of rules.

{% raw %}
<iframe src="../content/day01/04/embed.html" width="100%" height="450" frameborder="no"></iframe>
{% endraw %}
