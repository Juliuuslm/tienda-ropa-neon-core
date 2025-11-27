# NEON CORE - Image Management Guide

## Folder Structure

```
public/images/
├── hero/                    # Hero section background
├── manifiesto/              # Featured product showcase
├── coleccion/               # Product grid (3 products)
├── tech/                    # Material/fabric showcase
├── lookbook/                # Lookbook gallery (4 images)
├── reviews/                 # Reviews section (no images needed)
├── social/                  # Social/community grid (4 images)
└── IMAGES_GUIDE.md          # This file
```

## Quick Summary

| Section | Images | Dimensions | Format | Notes |
|---------|--------|-----------|--------|-------|
| **Hero** | 1 | 1920x1080 | JPG | Background, heavily filtered |
| **Manifiesto** | 1 | 800x1000 | JPG | Featured hoodie, portrait |
| **Colección** | 3 | 600x800 each | JPG | Product cards, portrait |
| **Tech** | 1 | 800x800 | JPG | Fabric texture, square |
| **Lookbook** | 4 | Mixed sizes | JPG | Grid layout (various) |
| **Reviews** | 0 | N/A | N/A | Text-based, uses initials |
| **Social** | 4 | 400x400 each | JPG | Community grid, square |

## Total Images Needed: 14

### Breakdown:
- ✅ 1 Hero background
- ✅ 1 Manifiesto product
- ✅ 3 Collection products
- ✅ 1 Tech material
- ✅ 4 Lookbook photos
- ✅ 0 Reviews (text only)
- ✅ 4 Social images

## Image Optimization Tips

1. **Format**: Use JPG for photographs, WebP for modern browsers
2. **Compression**: Optimize with tools like TinyPNG or ImageOptim
3. **Sizing**: Don't upload larger than needed dimensions
4. **Naming**: Use lowercase, hyphens, descriptive names

### Recommended Tools:
- **ImageOptim** (Mac): Free compression
- **TinyPNG/TinyJPG**: Online compression
- **ImageMagick**: CLI tool for batch processing

## File Naming Convention

```
[section]-[description].jpg
Example: cyber-hoodie-v2.jpg
```

## How to Add Your Images

1. **Prepare your image** with correct dimensions
2. **Optimize** the file size
3. **Place in appropriate folder** under `/public/images/[section]/`
4. **Update component** to reference the new image path

### Example:
```tsx
// Before (placeholder):
img: 'https://placehold.co/600x800/101010/22d3ee?text=CYBER+HOODIE+V2'

// After (real image):
img: '/images/coleccion/cyber-hoodie-v2.jpg'
```

## Current Placeholders

All sections currently use placeholder images from `placehold.co`.
To switch to real images, update the component paths in `src/components/NeonCore.tsx`.

### Placeholder Replacement Checklist:

#### Hero Section (Line ~119)
- [ ] Replace with: `/images/hero/cyber-city-bg.jpg`

#### Manifiesto Section (Line ~274)
- [ ] Replace with: `/images/manifiesto/hoodie-model.jpg`

#### Colección Section (Lines ~315-320)
- [ ] Replace with:
  - `/images/coleccion/cyber-hoodie-v2.jpg`
  - `/images/coleccion/system-failure-tee.jpg`
  - `/images/coleccion/neural-link-cap.jpg`

#### Tech Section (Line ~389)
- [ ] Replace with: `/images/tech/heavy-cotton-texture.jpg`

#### Lookbook Section (Lines ~447-463)
- [ ] Replace with:
  - `/images/lookbook/hoodie-street-shot.jpg`
  - `/images/lookbook/cap-detail.jpg`
  - `/images/lookbook/tee-back-print.jpg`
  - `/images/lookbook/full-outfit.jpg`

#### Social Section (Lines ~580-585)
- [ ] Replace with:
  - `/images/social/social-1.jpg`
  - `/images/social/social-2.jpg`
  - `/images/social/social-3.jpg`
  - `/images/social/social-4.jpg`

## Next Steps

1. ✅ Folder structure created
2. ⏳ Add real images to respective folders
3. ⏳ Update component paths in NeonCore.tsx
4. ⏳ Test and optimize images
5. ⏳ Consider implementing lazy loading

## Performance Considerations

- **Lazy Loading**: Implement with Next.js `Image` component
- **Responsive Images**: Use `srcSet` for different screen sizes
- **Image CDN**: Consider Cloudinary or similar for optimization
- **Blur Placeholder**: Add while images load

## Contact / Questions

For specific image requirements, refer to the individual README.md files in each section folder.
