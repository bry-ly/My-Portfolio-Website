# Accessibility Guidelines & Standards

This document outlines the accessibility standards and practices implemented in this project to ensure WCAG 2.1 AA compliance.

## Overview

Our accessibility implementation focuses on:
- Semantic HTML structure with proper headings hierarchy
- Keyboard navigation support
- Screen reader compatibility
- Focus management and visible focus indicators
- Responsive design that works across all devices
- Reduced motion support for users with vestibular disorders
- High contrast mode support

## Implementation Checklist

### ✅ Semantic Structure
- [x] Proper heading hierarchy (h1 → h2 → h3)
- [x] Landmark roles (`<main>`, `<nav>`, `<header>`, `<section>`, `<article>`)
- [x] Descriptive page titles and section labels
- [x] Meaningful link text and button labels

### ✅ Keyboard Navigation
- [x] All interactive elements accessible via keyboard
- [x] Logical tab order throughout the application
- [x] Skip-to-content link for screen readers
- [x] No keyboard traps
- [x] Section navigation with keyboard shortcuts

### ✅ Focus Management
- [x] Visible focus indicators on all interactive elements
- [x] Focus rings with sufficient contrast
- [x] Focus management for dynamic content
- [x] Proper focus restoration after modal/overlay close

### ✅ Screen Reader Support
- [x] ARIA labels and descriptions where needed
- [x] Screen reader announcements for state changes
- [x] Live regions for form validation and status updates
- [x] Hidden decorative content marked with `aria-hidden="true"`

### ✅ Form Accessibility
- [x] Proper form labels associated with inputs
- [x] Error messages linked to form fields
- [x] Form validation with screen reader announcements
- [x] Required field indicators
- [x] Field grouping with `<fieldset>` and `<legend>`

### ✅ Motion & Animation
- [x] `prefers-reduced-motion` media query support
- [x] Static fallback content for animated elements
- [x] Pause animations when tab is not visible
- [x] Optional animations that don't affect functionality

### ✅ Responsive Design
- [x] Mobile-first approach starting from 320px
- [x] No horizontal scrolling on small screens
- [x] Touch-friendly touch targets (minimum 44px)
- [x] Responsive images with proper alt text
- [x] Readable text at all zoom levels up to 200%

## Component-Specific Guidelines

### Navigation Components
- Use semantic `<nav>` elements with `aria-label`
- Provide keyboard shortcuts for section navigation
- Include skip links for main content
- Use `aria-current` for active navigation items

### Form Components
- Always include `<label>` elements for inputs
- Use `aria-describedby` for help text and error messages
- Implement real-time validation with `aria-live`
- Group related fields with `<fieldset>` and `<legend>`
- Use `role="alert"` for error messages

### Interactive Elements
- Provide descriptive `aria-label` for icon-only buttons
- Use `aria-expanded` for collapsible content
- Implement `aria-live` for dynamic content updates
- Use `aria-current` for current/active states

### Media Components
- Provide descriptive alt text for images
- Use `aria-hidden="true"` for decorative images
- Implement keyboard controls for carousels/sliders
- Provide static alternatives for animated content

## Testing Guidelines

### Automated Testing
```bash
# Run accessibility linting
pnpm lint

# Build and test for accessibility issues
pnpm build
```

### Manual Testing Checklist
- [ ] Navigate entire site using only keyboard
- [ ] Test with screen reader (NVDA, JAWS, or VoiceOver)
- [ ] Verify all interactive elements are reachable
- [ ] Test form submission and validation messages
- [ ] Verify reduced motion settings are respected
- [ ] Check color contrast ratios
- [ ] Test responsive behavior at 320px width
- [ ] Verify skip links work properly

### Screen Reader Testing
1. **Navigate by headings**: Use heading navigation to jump through sections
2. **Navigate by landmarks**: Use landmark navigation to find main content and navigation
3. **Navigate by links**: Verify all links have descriptive text
4. **Navigate by form fields**: Test form navigation and validation
5. **Test live regions**: Verify dynamic content announcements

### Keyboard Testing
1. **Tab navigation**: Ensure logical tab order
2. **Enter/Space activation**: Verify all buttons and links activate correctly
3. **Arrow key navigation**: Test carousels and sliders
4. **Escape key**: Verify modal/overlay dismissal
5. **Skip links**: Test skip-to-content functionality

## Design System Guidelines

### Color & Contrast
- Minimum contrast ratio of 4.5:1 for normal text
- Minimum contrast ratio of 3:1 for large text
- Color is not the only means of conveying information
- Support for high contrast mode

### Typography
- Minimum font size of 16px for body text
- Sufficient line height (1.4-1.6)
- Readable font families
- Scalable text up to 200% zoom

### Interactive Elements
- Minimum touch target size of 44x44px
- Sufficient spacing between interactive elements
- Clear visual hierarchy
- Consistent interaction patterns

### Motion & Animation
- Respect `prefers-reduced-motion` setting
- Provide static alternatives for essential animations
- Ensure animations don't cause seizures
- Pause animations when page is not visible

## Common Accessibility Patterns

### Error Handling
```tsx
// Form validation with screen reader support
{error && (
  <p role="alert" aria-live="polite" className="error">
    {error}
  </p>
)}
```

### Dynamic Content
```tsx
// Announcing state changes
<div aria-live="polite" aria-atomic="true">
  {isLoading ? "Loading..." : "Content loaded"}
</div>
```

### Skip Links
```tsx
// Skip to main content
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
```

### Focus Management
```tsx
// Managing focus in modals
const modalRef = useRef<HTMLDivElement>(null);

// Auto-focus first element and trap focus
useEffect(() => {
  if (isOpen && modalRef.current) {
    const firstFocusable = modalRef.current.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    firstFocusable?.focus();
  }
}, [isOpen]);
```

## Performance Considerations

### Animation Performance
- Use `transform` and `opacity` for smooth animations
- Throttle scroll and resize event listeners
- Use `Intersection Observer` for lazy loading
- Pause animations when not visible

### Screen Reader Performance
- Minimize unnecessary `aria-live` announcements
- Use `aria-atomic="true"` for complete messages
- Avoid excessive live region updates
- Provide static alternatives for complex animations

## Tools & Resources

### Development Tools
- [axe DevTools](https://www.deque.com/axe/devtools/) - Browser extension for accessibility testing
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Built into Chrome DevTools
- [WAVE](https://wave.webaim.org/) - Web accessibility evaluation tool
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/) - Color contrast testing

### Screen Readers
- [NVDA](https://www.nvaccess.org/download/) (Windows, free)
- [VoiceOver](https://support.apple.com/guide/voiceover/) (macOS, built-in)
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) (Windows, trial)
- [Orca](https://wiki.gnome.org/Projects/Orca) (Linux, free)

### Validation Tools
- [W3C Markup Validator](https://validator.w3.org/) - HTML validation
- [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) - CSS validation
- [AChecker](https://achecker.ca/) - Web accessibility checker

## Ongoing Maintenance

### Regular Audits
- Run accessibility tests on every release
- Test with real users who have disabilities
- Review and update accessibility guidelines annually
- Monitor for new WCAG guidelines and updates

### Team Training
- Ensure all developers understand accessibility basics
- Provide accessibility-focused code reviews
- Include accessibility in the definition of done
- Regular team training on accessibility tools and techniques

### Monitoring
- Track accessibility scores in CI/CD
- Monitor user feedback for accessibility issues
- Regular automated and manual testing
- Keep dependencies updated for accessibility patches

## WCAG 2.1 AA Compliance Summary

This project aims to meet all WCAG 2.1 AA criteria:

- **Perceivable**: Proper semantics, alt text, captions, color contrast
- **Operable**: Keyboard accessible, no seizures, enough time, navigable
- **Understandable**: Readable text, predictable functionality, input assistance
- **Robust**: Compatible with assistive technologies, valid HTML

## Contact

For accessibility questions or to report issues, please contact the development team or create an issue in the project repository.

---

*Last updated: December 2024*
*Next review: March 2025*