"""
This module contains prompts designed for AI development tools to generate project files.
"""

PLAN_PROMPT = """
ACTION: Generate DEVELOPMENT_PLAN markdown file.
FILE_NAME: plan.md
PURPOSE: Provide AI development tool with structured project roadmap.
PROJECT_DESCRIPTION:
{description}

PLAN_STRUCTURE:
1.  Markdown Heading 1: Project Title ✨ (Include relevant emoji)
2.  Markdown Heading 2: Objective
    * Brief, clear statement of project goal.
3.  Markdown Heading 2: Development Phases
    * Use Markdown Heading 3 for each phase (e.g., ### Phase 1: Setup).
    * Provide a brief description for each phase using bullet points.
    * List standard phases (Setup, Backend, Frontend, Integration, Testing, Deployment).
4.  Markdown Heading 2: Technology Stack Overview
    * List key technologies (Frontend, Backend, Database, UI). Note: Refer to blueprint.md for details.
5.  Markdown Heading 2: Key Considerations
    * Use bullet points for important notes, constraints (like 'simple'), or recommendations.

FORMAT: Clean markdown. Use #, ##, ### for headings, - or * for bullet points.
OUTPUT: ONLY the markdown content for plan.md.
"""

TASKS_PROMPT = """
ACTION: Generate DEVELOPMENT_TASKS markdown file.
FILE_NAME: tasks.md
PURPOSE: Provide AI development tool with prioritized, actionable task list.
PROJECT_DESCRIPTION:
{description}

TASK_LIST_STRUCTURE:
1.  Markdown Heading 1: Task List Title ✅ (Include relevant emoji)
2.  Organize tasks under Development Phases (Use Markdown Heading 2, matching plan.md phases).
3.  Within each phase, create Task Groups (Use Markdown Heading 3, e.g., ### Backend: API Endpoints and name them as e.g., Group 1.1, 1.2, 2.1 etc..).
4.  List individual tasks using markdown checkbox format: `- [ ] Task description`.
5.  Tasks should be specific and actionable steps for development.
6.  Order tasks within groups prioritizing dependencies and simpler tasks first where logical.
7.  Ensure all major development areas are covered based on the project description.

FORMAT: Clean markdown. Use #, ##, ### for headings, - [ ] for tasks.
OUTPUT: ONLY the markdown content for tasks.md.
"""

BLUEPRINT_PROMPT = """
ACTION: Generate PROJECT_BLUEPRINT markdown file.
FILE_NAME: blueprint.md
PURPOSE: Provide AI development tool with technical overview and specifications.
PROJECT_DESCRIPTION:
{description}

BLUEPRINT_STRUCTURE:
1.  Markdown Heading 1: Blueprint Title 🏛️ (Include relevant emoji)
2.  Markdown Heading 2: Project Overview
    * Brief summary of the application's purpose and core function.
3.  Markdown Heading 2: Technology Stack
    * Present recommended stack in a markdown table (Columns: Component, Technology, Justification).
4.  Markdown Heading 2: Architecture Diagram
    * Use a markdown code block for a simple mermaid syntax diagram (e.g., flowchart 'graph TD') showing core components (Frontend, Backend, Database) and their interaction.
5.  Markdown Heading 2: Technical Details
    * Markdown Heading 3: Conceptual Data Model
        * Outline key entities (e.g., User, Note) and their main attributes/relationships using bullet points.
    * Markdown Heading 3: Primary User Flow
        * Describe a core user journey (e.g., User Signup -> Login -> Create Note -> View Notes) using bullet points.

FORMAT: Clean markdown. Use #, ##, ### for headings, - or * for lists, |---| syntax for tables, ```mermaid code block.
OUTPUT: ONLY the markdown content for blueprint.md.
"""