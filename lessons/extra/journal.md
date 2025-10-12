# The Journal - Detailed Breakdown

## What is the Journal?

The journal is inspired by **Vera Molnár's practice** of documenting algorithmic thinking, artistic decisions, and creative exploration. Molnár, a pioneer of computer art, kept detailed notebooks where she worked out algorithmic processes by hand before having access to computers - developing what she called her "machine imaginaire" (imaginary machine).

Like Molnár's journals ([Part 01](https://digitalideation.github.io/gencg_h2501/assets/pdf/vera_journal_01.pdf) | [Part 02](https://digitalideation.github.io/gencg_h2501/assets/pdf/vera_journal_02.pdf)), your journal is a **living document** that captures both your technical experiments and artistic thinking throughout the semester.

**Format:**

- Digital documentation using markdown
- Code experiments and iterations
- Hand-drawn sketches (scanned and embedded)
- Weekly entries documenting your generative art journey

<!-- Used for line break when printing pdf -->
<div style="break-after: always;"></div>

## Purpose & Learning Goals

Through consistent journaling, you will develop:

- **Ability to articulate algorithmic thinking** in words, sketches, and code
- **Practice documenting both successes AND failures** - learning happens in the gaps
- **Building a personal visual/technical vocabulary** for discussing generative work
- **Developing critical reflection skills** to analyze your own creative decisions
- **Understanding the creative process** as iterative and experimental

<div style="break-after: always;"></div>

## What to Document - Weekly Entry Structure

Each week's journal entry should include these four elements:

### a) Exploration & Experimentation

- **Code experiments** - working snippets, failed attempts, variations
- **Visual sketches** - hand-drawn ideas, scanned and embedded in your journal
- **Parameters tested** - what variables did you play with? What ranges did you explore?
- **Technical challenges** - what didn't work? What problems did you encounter?

_Example: "This week I experimented with nested loops to create grid patterns. I tried varying the spacing parameter from 10 to 50 pixels and noticed that below 20, the pattern becomes too dense..."_

### b) Influences & References

- **Artists and artworks** that inspired your work this week
- **Techniques or concepts** from readings, examples, or other sources
- **Links, images, citations** - be specific about what you're referencing
- **Why these references matter** - how do they connect to your exploration?

_Example: "Looking at Bridget Riley's op art pieces made me think about how repetition with slight variation creates visual rhythm. I tried to apply this principle using sine waves to modulate my grid spacing..."_

### c) Algorithmic Thinking

- **Rules and systems** you're developing - what are the "if-then" statements?
- **Parameters and constraints** - what can vary? What stays fixed?
- **How code translates to visual outcomes** - describe the logic
- **Pseudocode or diagrams** - sketch out your thinking process

_Example: "My system: For each cell in the grid, if the distance from center is greater than 100, draw a circle, otherwise draw a square. The size is determined by distance % 50..."_

### d) Critical Reflection

- **What worked?** What surprised you?
- **What didn't work?** Why do you think it failed?
- **Artistic decisions** - why did you choose certain colors, compositions, parameters?
- **Questions that emerged** - what do you want to explore next?
- **Next steps** - where is this heading?

_Example: "The random color selection creates chaos, but maybe that's not what I want. Next week I'll explore using a limited color palette or color harmony rules. I'm also curious about how timing/animation could add another dimension..."_

## Format & Technical Requirements

**Location:**

- `journal` branch of the course repository
- Keep your journal organized and easy to navigate

**File Structure:**

- Individual markdown files per week: `week_01.md`, `week_02.md`, etc.
- OR one cumulative file with clear week headers: `journal.md`
- Choose the structure that works best for you

**Content Requirements:**

- Use markdown formatting for clarity
- Include code snippets using code blocks
- Embed images of sketches/outputs (use relative paths)
- Add links to external references
- **Drawings MUST be scanned/photographed and embedded** - hand sketches are essential!

**File Naming & Organization:**

```
journal/
├── week_01.md
├── week_02.md
├── images/
│   ├── sketch_week01_01.jpg
│   ├── sketch_week01_02.jpg
│   └── output_week02.png
└── code/
    ├── 01/
    │   ├── embed.html
    │   ├── sketch.js
    │   └── ...
    └── 02/
    ...
```

## Tools & Platforms

You are free to use any tools that support your journaling process. See the [Journaling + JS editors](#journaling--js-editors) section for recommended platforms and tools.

### ⚠️ Required for submission:

All students must submit their journal to **ILIAS** by the final deadline.

**If using GitHub + Markdown (recommended):**

- Maintain your journal in the `journal` branch of the course repository
- All drawings must be scanned/photographed and embedded
- Code snippets should be included directly or linked to files in your repo
- **For ILIAS submission:**
  1. Export your entire journal folder as a ZIP file and upload to ILIAS
  2. A document containing the direct link(s) to your online journal

**If using an alternative platform (Observable, Notion, etc.):**

- You may use alternative platforms for your working process
- **For ILIAS submission:** You must submit BOTH:
  1. A PDF export of your complete journal
  2. A document containing the direct link(s) to your online journal

**Submission requirements (all students):**

- All weekly entries must be included
- All drawings/sketches must be visible in the submission
- All code snippets and references must be accessible
- Final deadline: Week 14 (see course schedule for exact date)

**Workflow suggestions:**

- Draft in your preferred markdown editor (VS Code, Obsidian, Typora, etc.)
- Use Observable or OpenProcessing for live experiments, then document in your journal
- Use Are.na or Pinterest for collecting visual references, then cite in your journal
- Sketch on paper, scan/photograph, and embed in your markdown files

## Evaluation Criteria for Journal (40% of final grade)

Your journal will be evaluated based on the following criteria:

### Consistency & Regularity (25%)

- **Weekly entries** submitted throughout the semester
- **Sustained engagement** - no large gaps in documentation
- **Timely updates** - journal reflects current weekly work

### Depth of Documentation (30%)

- **All four elements present** in each entry (exploration, references, algorithmic thinking, reflection)
- **Both technical and artistic aspects** covered
- **Includes drawings/sketches** - visual thinking is essential
- **Code examples** that illustrate your experiments
- **Sufficient detail** - entries go beyond surface-level description

### Quality of Reflection (25%)

- **Critical analysis** of your own work - not just description
- **Evidence of learning and iteration** - showing growth over time
- **Articulation of creative decisions** - explaining your "why"
- **Honest assessment** of failures and challenges
- **Thoughtful questions** that drive further exploration

### Use of References (20%)

- **Engagement with generative art history** and contemporary practice
- **Proper citations** with links and credits
- **Meaningful connections** between influences and your own work
- **Diverse references** - exploring multiple artists, techniques, concepts

## Timeline & Milestones

**Week 1 (Lesson 01):**

- Journal begins - first entry
- Set up your journal structure in the `journal` branch

**Weeks 2-4:**

- Weekly documentation becomes routine
- Building your visual and technical vocabulary

**Week 5 (Lesson 05 - Reflection / Collect / Prepare):**

- **Mid-term journal review**
- Group feedback session on journal entries
- Reflect on documentation practice so far
- Adjust approach for second half of semester

**Weeks 6-7:**

- Continued weekly documentation
- Integration of techniques from first half

**Week 8 or 9:**

- **Secondary journal review**
- Individual or peer feedback on documentation progress
- Assessment of iterative development
- Refinement of approach heading into final project

**Weeks 10-13:**

- Continued weekly documentation
- Focus on final project development
- Integration of multiple techniques

**Week 14 (Final Presentations):**

- **Final journal entry** reflecting on entire semester journey
- Complete journal submission as part of final deliverables

## Examples & Best Practices

### Good Journal Entry Structure

```markdown
# Week 3 - Grid Systems & Variation

## Exploration

This week I experimented with nested for-loops to create grid patterns.
I started with a basic grid of circles, then introduced variation using
modulo operations.

[Include code snippet]

[Embed image of sketch]

The challenge was controlling the variation - too much randomness created
chaos, too little was boring.

## References

- Vera Molnár's "Des(ordre)" series (1974)
- Sol LeWitt's wall drawings with systematic variation
- [Link to specific artwork]

What struck me about Molnár's work is how she uses simple rules to create
complex patterns. I wanted to apply this constraint-based approach...

## Algorithmic Thinking

My system:

- Create grid of N x N cells
- For each cell at position (i, j):
  - If (i + j) % 3 == 0, draw filled circle
  - Else draw outline only
  - Size varies based on distance from center

[Include pseudocode or diagram]

## Reflection

The modulo operation created an interesting diagonal pattern I didn't
anticipate. This "happy accident" made me realize I should explore more
mathematical operations as design tools.

Next week I want to explore:

- Using sine/cosine for organic variation
- Color palettes based on position
- Animation of the grid system

**Questions:** How can I make the variation feel intentional rather than
arbitrary? What role does symmetry play in perceived order?
```

### Common Pitfalls to Avoid

❌ **Just posting code without explanation**

- The journal is not just a code repository
- Always explain your thinking and decisions

❌ **Only documenting successes**

- Failed experiments are valuable learning moments
- Document what didn't work and why

❌ **No visual documentation**

- Drawings and sketches are required
- Images of outputs help track your visual evolution

❌ **Vague reflections**

- "It looks cool" is not enough
- Dig deeper: Why? What makes it work? What could be better?

❌ **Missing references**

- Your work exists in context
- Show what inspires and influences you

### Tips for Effective Documentation

✅ **Document while you work, not after**

- Capture your thinking in the moment
- It's easier than trying to remember later

✅ **Include failed experiments**

- They often lead to the best discoveries
- Show your iterative process

✅ **Use visual thinking**

- Sketch ideas before coding
- Diagram your algorithmic logic
- Take screenshots of interesting outputs

✅ **Be specific**

- Instead of "I changed the colors," say "I switched from random RGB to a complementary color scheme using HSB color mode"

✅ **Ask questions**

- Good journals are full of curiosity
- Write down questions that emerge during exploration

✅ **Connect to broader context**

- How does your work relate to generative art history?
- What conversations in art/design does it engage with?

## Getting Started

1. **Set up your journal branch** in the course repo
2. **Create your first entry** (Week 1) - introduce yourself and your interests in generative art
3. **Establish a weekly routine** - set aside time each week to document
4. **Experiment with format** - find what works for you within the requirements
5. **Review Vera Molnár's journals** for inspiration on visual documentation

Remember: The journal is for YOU first - it's a tool for learning and growth. The evaluation is secondary to the value it provides in developing your practice as a generative artist.
