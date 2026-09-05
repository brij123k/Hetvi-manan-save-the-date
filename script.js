// ==========================================================================
// Hetvi & Manan — save the date 
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Envelope intro ---------------- */
  const envelopeScreen = document.getElementById('envelope-screen');
  const envelopeBtn = document.getElementById('envelope');
  const site = document.getElementById('site');
  const bgAudio = document.getElementById('bg-audio');

  envelopeBtn.addEventListener('click', () => {
    if (envelopeBtn.classList.contains('opening')) return;
    envelopeBtn.classList.add('opening');

    setTimeout(() => {
      envelopeScreen.classList.add('closed');
      document.body.style.overflow = 'auto';
      site.classList.add('visible');
    }, 700);
  }, { once: true });

  // lock scroll until envelope opened
  document.body.style.overflow = 'hidden';

  /* ---------------- Vinyl play/pause ---------------- */
  const vinyl = document.getElementById('vinyl');
  vinyl.addEventListener('click', () => {
    vinyl.classList.toggle('playing');
    if (vinyl.classList.contains('playing')) {
      bgAudio.play().catch(() => {});
    } else {
      bgAudio.pause();
    }
  });

  /* ---------------- Countdown ---------------- */
  const WEDDING_DATE = new Date('2027-01-27T00:00:00+05:30').getTime();
  const elDays = document.getElementById('cd-days');
  const elHours = document.getElementById('cd-hours');
  const elMins = document.getElementById('cd-mins');
  const elSecs = document.getElementById('cd-secs');

  function pad(n){ return String(n).padStart(2, '0'); }

  function updateCountdown(){
    const now = Date.now();
    let diff = WEDDING_DATE - now;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    elDays.textContent = pad(days);
    elHours.textContent = pad(hours);
    elMins.textContent = pad(mins);
    elSecs.textContent = pad(secs);
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------------- Our Story modal + carousel ---------------- */
  const openStoryBtn = document.getElementById('open-story');
  const storyModal = document.getElementById('story-modal');
  const storyClose = document.getElementById('story-close');

  const stories = [
    { year: '2020', caption: 'It Started With a Conversation', label: 'Park Bench, 2020' },
    { year: '2021', caption: 'Somewhere Along The Way', label: 'City Lights, 2021' },
    { year: '2023', caption: 'We Knew It Was Forever', label: 'The Proposal, 2023' },
    { year: '2026', caption: 'Here We Are, Getting Married', label: 'Engagement, 2026' },
  ];
  let storyIndex = 0;

  const polaroidYear = document.querySelector('.polaroid-year');
  const polaroidPhoto = document.querySelector('.polaroid-photo');
  const polaroidCaption = document.querySelector('.polaroid-caption');
  const carDots = document.querySelector('.car-dots');

  stories.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => { storyIndex = i; renderStory(); });
    carDots.appendChild(dot);
  });

  function renderStory(){
    const s = stories[storyIndex];
    polaroidYear.textContent = s.year;
    polaroidPhoto.setAttribute('data-label', s.label);
    polaroidCaption.textContent = s.caption;
    [...carDots.children].forEach((d, i) => d.classList.toggle('active', i === storyIndex));
  }

  document.querySelector('.car-prev').addEventListener('click', () => {
    storyIndex = (storyIndex - 1 + stories.length) % stories.length;
    renderStory();
  });
  document.querySelector('.car-next').addEventListener('click', () => {
    storyIndex = (storyIndex + 1) % stories.length;
    renderStory();
  });

  openStoryBtn.addEventListener('click', () => {
    renderStory();
    storyModal.classList.remove('hidden');
    requestAnimationFrame(() => storyModal.classList.add('visible'));
    document.body.style.overflow = 'hidden';
  });

  storyClose.addEventListener('click', () => {
    storyModal.classList.remove('visible');
    document.body.style.overflow = 'auto';
    setTimeout(() => storyModal.classList.add('hidden'), 500);
  });

  /* ---------------- RSVP flow ---------------- */
  const rsvpChoice = document.getElementById('rsvp-choice');
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpThankyou = document.getElementById('rsvp-thankyou');
  const attendingField = document.getElementById('attending-field');
  const guestLabel = document.getElementById('guest-label');

  rsvpChoice.querySelectorAll('.rsvp-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.dataset.answer;
      attendingField.value = answer;
      guestLabel.style.display = answer === 'yes' ? 'block' : 'none';
      rsvpChoice.classList.add('hidden');
      rsvpForm.classList.remove('hidden');
    });
  });

  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Hook up a real endpoint (e.g. Formspree, Google Sheets, EmailJS) here if needed.
    rsvpForm.classList.add('hidden');
    rsvpThankyou.classList.remove('hidden');
  });

});
