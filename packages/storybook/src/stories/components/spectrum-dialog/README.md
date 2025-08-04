# Spectrum Dialog

A modal dialog component using the HTML dialog element with background shade. Features close functionality, optional title, control bar, and uses spectrum-panel for styling.

## Key Features

- **Native HTML Dialog**: Built on the semantic HTML `<dialog>` element
- **Background Shade**: Customizable backdrop with blur effects
- **Close Functionality**: Multiple ways to close (button, outside click, Escape key)
- **Flexible Content**: Content slot for any HTML content
- **Control Bar**: Optional buttons with different variants and actions
- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: Built-in focus management and keyboard navigation
- **Theming**: Integrates with Spectrum design tokens

## Basic Usage

```html
<spectrum-dialog title="My Dialog" open="false">
  <div slot="content">
    <p>Dialog content goes here.</p>
  </div>
</spectrum-dialog>
```

## Advanced Usage

### With Control Bar

```html
<spectrum-dialog title="Confirmation" id="my-dialog">
  <div slot="content">
    <p>Are you sure you want to proceed?</p>
  </div>
</spectrum-dialog>

<script>
  const dialog = document.getElementById('my-dialog');
  dialog.buttons = [
    { id: 'cancel', label: 'Cancel', variant: 'secondary' },
    { id: 'confirm', label: 'Confirm', variant: 'primary' }
  ];
</script>
```

### Programmatic Control

```javascript
const dialog = document.querySelector('spectrum-dialog');

// Show dialog
await dialog.show();

// Hide dialog
await dialog.hide();

// Listen for events
dialog.addEventListener('dialogAction', (event) => {
  console.log('Action:', event.detail);
});
```

## Use Cases

- **Confirmation Dialogs**: Ask users to confirm destructive actions
- **Form Dialogs**: Collect user input in a focused interface
- **Information Displays**: Show detailed information or help content
- **Image Galleries**: Display media in fullscreen or large format
- **Settings Panels**: Provide configuration options
- **Loading States**: Show progress or processing information

## Accessibility Features

- Semantic HTML `<dialog>` element
- Automatic focus management and trapping
- Keyboard navigation support (Escape, Tab)
- ARIA labeling with `aria-labelledby`
- Screen reader announcements
- High contrast mode support
- Reduced motion support

## Browser Support

- **Modern Browsers**: Full support including backdrop-filter effects
- **Safari**: Supported with vendor prefixes
- **Older Browsers**: Graceful degradation without backdrop blur

## Dependencies

- **spectrum-panel**: Used for visual container styling
- **spectrum-button**: Used for control bar buttons

Built with ❤️ by the Spectrum Design System team. 