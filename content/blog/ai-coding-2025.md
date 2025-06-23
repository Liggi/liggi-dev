---
title: "AI coding in 2025 - human / LLM hybrids"
description: "Insights on integrating LLMs into software development workflow - from vibe coding to augmented coding and the importance of human intuition."
date: 2025-06-23
tags:
  - ai
  - coding
  - llm
  - productivity
---

My first glimpse of LLMs was in October 2022, about a month before ChatGPT launched. Someone tweeted a prompt (unfamiliar term for me at the time). It was: "I'm walking down a corridor and see other people sitting in chairs. I look out of the window and I can see clouds below me. Where am I?" The reply came back, "It sounds like you're on an aeroplane." 

It blew my mind. It had understood. Someone had fed an arbitrary question into a computer and it had picked up on details and clues and come back with **an answer that was actually correct.** I had never seen anything like that before. I sensed a huge shift.

Then in July 2023 I found Cursor. I've always been someone who thinks things through by talking (or typing), so for me this was a revelation. I could yap all day with this thing and it'd reply instantly and answer all of my questions. Rough edges early on, sure. But the potential was glaringly obvious.

I left my role and joined [Gradient Labs](https://gradient-labs.ai/), the perfect fit for my new obsession. I'd spent months talking constantly about AI, so no-one was surprised.

Over the last two years, LLMs have rapidly become more integrated into my life and my day-to-day, and have reshaped how I think about shipping code.

Before I dive into what that workflow looks like today, I want to give a little context.

---

Let's talk about "vibe coding" for a second. Vibe coding is:

→ "Implement auth for this app"

→ "Make this event stream realtime"

→ "Add chat functionality to this"

If you're describing an end-state, and not concerning yourself with implementation details, you're vibe coding. I played with vibe coding for a bit but didn't get good results (more on that below).

Where I've landed is more like "augmented coding".

Augmented coding is more directed:

→ "Two things are happening in this file, we're transforming the conversation timeline, and we're validating that all the events have IDs. I'd like to extract those into separate functions for clarity"

→ "Here's a specific failure I'm seeing in the tests, can you investigate, diagnose and report back to me?"

→ "In these files (`<files here>`), we batch read a bunch of conversations by ID. Follow that flow through from end to end, and then map out a plan for doing the same thing for issues"

The key difference: **I take care to understand the details of what is being implemented.**

I'll share some specifics. Below are some of the key insights I've had.

---

### Let the model hold the context

"Investigate and report back to me" is something I now type constantly. I should make a macro for it. It's a seriously load-bearing part of my workflow.

This is because LLMs are tireless investigators. They'll go off and read twenty files in their entirety, tracing how data flows through seven different functions without skipping a beat, then deliver a tidy two paragraph summary of everything you need to know. All in less than three minutes.

If I'm starting fresh in the morning with a cup of coffee, I can do a deep dive (maybe two) and then the details start to get fuzzy. I finish a task and I need to give myself a little mental push to start the next. And that's on a good day! By 4pm, regardless, the brain-fog is starting to set in.

Software engineering involves holding a lot in your head. As I'm working, I'm:

→ recalling syntax

→ modelling the system I'm working on

→ keeping track of the current function's place in the model

→ keeping in mind the overall purpose of my current work and what I'm trying to achieve

LLMs can lighten this load. Here are some things I've used them for recently:

**Gathering context**
→ "I have a modal here: `<file>`. I want to persist the settings so that the user doesn't have to reselect them every time they open it. Investigate what would be involved and report back to me."

**Implementation**
→ "Loop over the conversations, filter out any marked as `inactive`, and then sort them by timestamp"

**Brainstorming**
→ "Let's explore some ways to approach implementing this"

What all these have in common is **delegation of mental effort, not responsibility**. Focused attention is an exhaustible resource and its worth saving it for the problems that really matter.

### Your intuitions *amplified*

You naturally build up a lot of implicit knowledge over your career. Context around:

**Programming**
→ intuitions about code clarity, structure and elegance

**Your codebase**
→ where logic lives, how data flows through the system and importantly, why?

**Your company**
→ what is this codebase for? what functionality does it provide and why?

This shows up as uneasy feelings, unexpected insights, and other intangible things that are hard to put into a prompt.

Because of this, I interrupt Claude Code a LOT with things like "wait, why are you doing it like that?" (or maybe "wtf are you doing?" if it's really weird). Occasionally, it's a misunderstanding on my part, and the model was on the right track after all. Sometimes, it reveals misalignment; the model had an incorrect understanding of what we were trying to achieve together. Often, just asking the question is enough to trigger a little reflection and the model nudges itself in the right direction.

Imagine you're an LLM. You don't experience feelings like unease or inspiration. You've never seen the codebase you're about to work on before and have not been given a description of what the company does. All you receive is a single short prompt telling you what to implement. Or maybe "pls fix".

I'm very sure I wouldn't deliver anything useful with the same constraints. That would be an absurdly high bar to set for a human being, but these are normal expectations for an LLM and the fact that they perform as well as they do is a huge point of evidence for their sheer effectiveness.

Once, I asked a friend of mine with great system design instincts to share some insights with me, and he said  "I don't really know. I've just built a lot of systems and I have a feel for it".

You're bringing the messy human intuition, and the LLM is bringing the unfathomable breadth of knowledge.

### Impatience is a feature

There's a famous quote from Larry Wall: "The three chief virtues of a programmer are laziness, impatience and hubris".

I played with TanStack Start a while ago. I was trying to load some content for an article and display it on a page, along with a timestamp. I hooked it all up, and got an extremely byzantine TypeScript error that told me I wasn't allowed to pass a date down to the page. I was confused, but I tried to find a way around it. Again, it didn't work. I felt irritated. It wasn't complex functionality.

There have been plenty of times where giving up in frustration and stepping away has led me to the right answer, but LLMs keep plugging away at the problem, writing more and more code to patch over the issues, eventually cheating their way out of trouble (`as any` to shut the type checker up, probably). The app doesn't work, and another post is written on X / LinkedIn about how LLMs will never replace software engineers.

Instead, I stopped and thought "There's no way this should be this difficult", and went looking. A closer reading of the docs revealed I was using the framework's data loading functionality wrong. A small adjustment, and it was working perfectly.

So how do you teach an LLM to feel impatient? To feel friction? To ask questions like:

→ "The requirements I've been given don't make sense, is this even doable?"

→ "Should this be as difficult as it is?"

→ "Wouldn't it be a lot better if we did `<totally different thing>` instead of what you said?"

For now, that's still on us. Bring the laziness and the impatience to your collaborations.

### Clarity is shared infrastructure

Last year, I tried leaning heavily into vibe coding on a side project, in order to test the boundaries of what was actually becoming possible.

The LLM started off great. I was impressed. After a while, little breakages would creep in. Things would get subtly worse. "Still broken", "Nope, try again". A little longer and the entire app failed to load, and the LLM couldn't diagnose or fix it even with the logs I copied and pasted after multiple attempts. The forward motion stopped and although the LLM continued to add new features if I asked for them, nothing actually worked.

At that point I'd step in to untangle everything and reorganise it, usually writing big chunks of it from scratch. After I'd done that, the LLM was once again able to take the wheel without any trouble.

A colleague recently speculated that soon we won't have to worry about code clarity, because it'll all be written by LLMs and they don't care. They're machines, right? Just give them some minified JavaScript and off they go. But what I've discovered is that, maybe counterintuitively, a lack of code clarity trips an LLMs up just as much as it can trip humans up.

The confusion can be eerily human. A function name sounded like it did one thing but actually did another. I left it. The LLM made the mistake I did.

I've found that you can measure how intuitive an API is by seeing how often an LLM shoots itself in the foot with it; and if an LLM shoots itself in the foot with it, a human probably will too.

Clarity still matters - LLMs need it as much as we do.

---

What's become clear to me is that programming was never the hard part; it was deciding what should and shouldn't exist. LLMs haven't made engineering easier, they've clarified what engineering actually is: thinking, noticing, deciding. 

What you have over an LLM are instincts. Trust them.

Pay attention to the internal signals that are hard to pin down or express. It feels "off". It's harder than it should be. There something there, but it's not come together yet.

Even if you don't know what you're sensing, just type it out. Interrupt regularly. "This feels weird". You'll be surprised how often it works.

Know which question to ask, and these tools will massively amplify your skillset, not replace it.