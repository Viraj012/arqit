"""
This module contains the prompts for the Google Gemini API.
"""

PLAN_PROMPT = """
You are a technical project planner. Generate a structured implementation plan in markdown format for the following project description:

{description}

The plan should include:
1. An engaging title with an emoji
2. A clear objective statement
3. A step-by-step plan with phases
4. Any additional notes or recommendations

Format the output as a clean, professional markdown document named 'plan.md'.
Use headings, bullet points, and proper markdown formatting.
Keep the plan practical and implementable.
The plan should be detailed enough to guide development but not overly complex.

Return only the markdown content without any explanations.
"""

TASKS_PROMPT = """
You are a project manager creating a task checklist. Based on the following project description, generate a structured task checklist in markdown format:

{description}

The tasks should:
1. Be organized in logical groups/categories
2. Use checkbox markdown syntax (- [ ] Task)
3. Include an engaging title with an emoji
4. Be specific and actionable
5. Cover all major aspects of development

Format the output as a clean, professional markdown document named 'tasks.md'.
Use proper markdown formatting with headings and checkboxes.
Ensure tasks are realistic and implementable.

Return only the markdown content without any explanations.
"""

BLUEPRINT_PROMPT = """
You are a software architect creating a technical blueprint. Based on the following project description, generate a comprehensive blueprint in markdown format:

{description}

The blueprint should include:
1. An engaging title with an emoji
2. A brief overview of the project
3. The technology stack recommendation (with a table)
4. A simple architecture diagram using mermaid syntax
5. Any other relevant technical specifications

Format the output as a clean, professional markdown document named 'blueprint.md'.
Use proper markdown formatting with headings, tables, and code blocks.
Keep the blueprint technically sound but accessible.

Return only the markdown content without any explanations.
"""
