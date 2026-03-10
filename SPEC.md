# Europass 3D Portfolio Website Specification

## Project Overview
- **Project Name:** Europass 3D Interactive Portfolio
- **Project Type:** Single-page professional CV/Portfolio website
- **Core Functionality:** A digital transformation of the standard European CV format into an immersive web experience using 3D depth, parallax effects, and interactive layers
- **Target Users:** Recruiters, HR Professionals, Clients seeking technical talent

---

## UI/UX Specification

### Layout Structure

#### Page Structure
- **Hero/Background:** Three.js animated geometric mesh network
- **Main Container:** Floating 3D card centered on screen with tilt effect
- **Europass Layout:** Two-column design (Left Sidebar 33% / Right Content 67%)

#### Sections
1. **Header/Hero:** Profile photo with 3D pop effect, name, title
2. **Left Sidebar:** Personal info, contact, skills, languages
3. **Right Content:** Work experience, education, projects, achievements

#### Responsive Breakpoints
- Desktop (>992px): Full 3D tilt effect, two-column layout
- Tablet (768px - 991px): Reduced tilt, stacked layout
- Mobile (<768px): No tilt, vertical stacking for readability

### Visual Design

#### Color Palette
- **Primary (Europass Blue):** #0E47CB
- **Secondary (Europass Yellow):** #FFCC00
- **Background:** #0B1120 (Deep Space Blue)
- **Surface/Card:** #FFFFFF with 95% opacity
- **Text Primary:** #1E293B
- **Text Secondary:** #64748B
- **Accent:** #3B82F6

#### Typography
- **Font Family:** 'Roboto', 'Open Sans', sans-serif
- **Headings:** Bold, Uppercase, #1E293B
- **Body:** Regular, #334155
- **Section Titles:** 1.5rem, bold

#### Visual Effects
- **Glassmorphism:** Slight transparency on container
- **Depth:** Multi-layered box-shadow for elevation
- **Tilt Effect:** Container tilts based on mouse position (3-5 degrees)
- **Background:** Three.js rotating geometric mesh

### Components

#### 1. Profile Header
- Circular profile image (150px) with 3D border effect
- Name (large, bold)
- Professional title
- Country flag indicator

#### 2. Left Sidebar Components
- **Contact Info:** Icon + text with hover lift
- **Skills:** Animated progress bars with percentage
- **Languages:** Star rating system (1-5)
- **Social Links:** Hover animation

#### 3. Timeline Components (Right Sidebar)
- Vertical timeline with floating nodes
- Experience cards with hover lift effect
- Date badges with accent color

#### 4. Floating Action Button
- "Download PDF" button
- Pulsing animation
- Fixed bottom-right position

---

## Functionality Specification

### Core Features
1. **Bootstrap 5 Grid:** Responsive layout system
2. **Interactive Tilt:** JavaScript tilt effect on main container
3. **Three.js Background:** Animated geometric shapes
4. **Scroll Animations:** Fade-in and slide-up effects
5. **Smooth Scrolling:** Navigation to sections

### User Interactions
- Mouse movement over container triggers 3D tilt
- Hover over cards triggers lift effect
- Click navigation links for smooth scroll
- Social icons have hover animations

### Data Handling
- Static HTML content
- Easily customizable sections

---

## Technical Implementation

### File Structure
```
/europass-portfolio/
  index.html
  css/
    style.css
  js/
    main.js
```

### External Resources
- Bootstrap 5.3.0 (CDN)
- Three.js r128 (CDN)
- Google Fonts: Roboto, Open Sans
- Bootstrap Icons (CDN)

---

## Acceptance Criteria

1. ✅ Europass layout (left sidebar / right content)
2. ✅ Three.js animated background
3. ✅ 3D tilt effect on main container
4. ✅ Professional Europass blue branding
5. ✅ Fully responsive design
6. ✅ Smooth scroll navigation
7. ✅ Animated skill bars
8. ✅ Timeline for work/education
9. ✅ Download PDF button
10. ✅ Clean, professional code
