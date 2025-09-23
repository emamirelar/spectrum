// Simple debug test to understand the navigation issue
const { newSpecPage } = require('@stencil/core/testing');
const { SpectrumImageCarousel } = require('./dist/spectrum/spectrum.js');

async function debugTest() {
    const slides = [
        {
            id: 'slide1',
            image: { src: '/image1.jpg', alt: 'Image 1' },
            caption: { title: 'Slide 1' }
        },
        {
            id: 'slide2',
            image: { src: '/image2.jpg', alt: 'Image 2' },
            caption: { title: 'Slide 2' }
        },
        {
            id: 'slide3',
            image: { src: '/image3.jpg', alt: 'Image 3' },
            caption: { title: 'Slide 3' }
        }
    ];

    const page = await newSpecPage({
        components: [SpectrumImageCarousel],
        html: `<spectrum-image-carousel show-arrows show-dots></spectrum-image-carousel>`,
    });

    page.rootInstance.slides = slides;
    await page.waitForChanges();

    console.log('Initial state:');
    console.log('- currentSlide:', page.rootInstance.currentSlide);
    console.log('- parsedSlides length:', page.rootInstance.parsedSlides?.length);
    console.log('- infiniteLoop:', page.rootInstance.infiniteLoop);

    // Go to last slide
    await page.rootInstance.goToSlideIndex(2);
    await page.waitForChanges();

    console.log('After going to slide 2:');
    console.log('- currentSlide:', page.rootInstance.currentSlide);

    // Try to click next arrow
    const nextArrow = page.root.shadowRoot.querySelector('.spectrum-image-carousel__arrow--next');
    console.log('Next arrow found:', !!nextArrow);
    console.log('Next arrow disabled:', nextArrow?.hasAttribute('disabled'));

    if (nextArrow) {
        nextArrow.click();
        await page.waitForChanges();

        console.log('After clicking next arrow:');
        console.log('- currentSlide:', page.rootInstance.currentSlide);
    }
}

debugTest().catch(console.error);