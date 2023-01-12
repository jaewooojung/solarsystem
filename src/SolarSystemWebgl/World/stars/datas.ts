import { MathUtils } from "three";
import { StarData } from "../../../types";

let cached: Array<StarData>;

/**
 * 1 UNIT = Radius of Earth(km).
 */
export const UNIT = 6378.1;
const DAY_SECONDS = 24 * 60 * 60;
/**
 * km
 */
const AU = 150000000;

function virtualizeMeasurements(realStarDatas: Array<StarData>) {
  const multipliers = {
    radius: [0.05, 2, 2, 2, 2, 0.3, 0.3],
    distanceToSun: [0, 0, 0, 0, 0, -65, -150],
    period: {
      orbital: [
        1 / DAY_SECONDS,
        0.5 / DAY_SECONDS,
        0.5 / DAY_SECONDS,
        0.5 / DAY_SECONDS,
        0.5 / DAY_SECONDS,
        0.1 / DAY_SECONDS,
        0.1 / DAY_SECONDS,
      ],
      rotation: [
        1 / DAY_SECONDS,
        0.5 / DAY_SECONDS,
        0.1 / DAY_SECONDS,
        20 / DAY_SECONDS,
        20 / DAY_SECONDS,
        50 / DAY_SECONDS,
        50 / DAY_SECONDS,
      ],
    },
  };
  return realStarDatas.map((s, i) => {
    const newOrbitPeriod = s.period.orbital * multipliers.period.orbital[i];
    return {
      ...s,
      radius: s.radius * multipliers.radius[i],
      distanceToSun: s.distanceToSun / (AU * 0.04) + multipliers.distanceToSun[i],
      period: { orbital: newOrbitPeriod, rotation: s.period.rotation * multipliers.period.rotation[i] },
      orbitalRotaionRadianPerSecond: (2 * Math.PI) / newOrbitPeriod,
    };
  });
}

/**
 * real value
 */
const realStarDatas: Array<StarData> = [
  {
    name: "sun",
    distanceToSun: 0 * AU,
    inclinationFromSun: 0,
    period: {
      orbital: 0 * DAY_SECONDS,
      rotation: 27 * DAY_SECONDS,
    },
    radius: 696340,
    tangent_inclinationFromSun: Math.tan(MathUtils.degToRad(0)),
    summary: `The Sun is the star at the center of the Solar System. It is a nearly perfect ball of hot plasma,[18][19] heated to incandescence by nuclear fusion reactions in its core. The Sun radiates this energy mainly as light, ultraviolet, and infrared radiation, and is the most important source of energy for life on Earth.

    The Sun's radius is about 695,000 kilometers (432,000 miles), or 109 times that of Earth. Its mass is about 330,000 times that of Earth, comprising about 99.86% of the total mass of the Solar System.[20] Roughly three-quarters of the Sun's mass consists of hydrogen (~73%); the rest is mostly helium (~25%), with much smaller quantities of heavier elements, including oxygen, carbon, neon, and iron.[21]
    
    The Sun is a G-type main-sequence star (G2V). As such, it is informally, and not completely accurately, referred to as a yellow dwarf (its light is actually white). It formed approximately 4.6 billion[a][14][22] years ago from the gravitational collapse of matter within a region of a large molecular cloud. Most of this matter gathered in the center, whereas the rest flattened into an orbiting disk that became the Solar System. The central mass became so hot and dense that it eventually initiated nuclear fusion in its core. It is thought that almost all stars form by this process.
    
    Every second, the Sun's core fuses about 600 million tons of hydrogen into helium, and in the process converts 4 million tons of matter into energy. This energy, which can take between 10,000 and 170,000 years to escape the core, is the source of the Sun's light and heat. When hydrogen fusion in its core has diminished to the point at which the Sun is no longer in hydrostatic equilibrium, its core will undergo a marked increase in density and temperature while its outer layers expand, eventually transforming the Sun into a red giant. It is calculated that the Sun will become sufficiently large to engulf the current orbits of Mercury and Venus, and render Earth uninhabitable – but not for about five billion years. After this, it will shed its outer layers and become a dense type of cooling star known as a white dwarf, and no longer produce energy by fusion, but still glow and give off heat from its previous fusion.
    
    The enormous effect of the Sun on Earth has been recognized since prehistoric times. The Sun was thought of by some cultures as a deity. The synodic rotation of Earth and its orbit around the Sun are the basis of some solar calendars. The predominant calendar in use today is the Gregorian calendar which is based upon the standard 16th-century interpretation of the Sun's observed movement as actual movement.`,
  },
  {
    name: "mercury",
    distanceToSun: 0.4 * AU,
    inclinationFromSun: 3.38,
    period: {
      orbital: 87.969 * DAY_SECONDS,
      rotation: 58.646 * DAY_SECONDS,
    },
    radius: 2439.7,
    tangent_inclinationFromSun: Math.tan(MathUtils.degToRad(3.38)),
    summary: `Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun's planets. It is named after the Roman god Mercurius (Mercury), god of commerce, messenger of the gods, and mediator between gods and mortals, corresponding to the Greek god Hermes (Ἑρμῆς). Like Venus, Mercury orbits the Sun within Earth's orbit as an inferior planet; its apparent distance from the Sun as viewed from Earth never exceeds 28°. This proximity to the Sun means the planet can only be seen near the western horizon after sunset or the eastern horizon before sunrise, usually in twilight. At this time, it may appear as a bright star-like object, but is more difficult to observe than Venus. From Earth, the planet telescopically displays the complete range of phases, similar to Venus and the Moon, which recurs over its synodic period of approximately 116 days. Due to its synodic proximity to Earth, Mercury is most often the closest planet to Earth, with Venus periodically taking this role.[18][19]

    Mercury rotates in a way that is unique in the Solar System. It is tidally locked with the Sun in a 3:2 spin–orbit resonance,[20] meaning that relative to the fixed stars, it rotates on its axis exactly three times for every two revolutions it makes around the Sun.[a][21] As seen from the Sun, in a frame of reference that rotates with the orbital motion, it appears to rotate only once every two Mercurian years. An observer on Mercury would therefore see only one day every two Mercurian years.
    
    Mercury's axis has the smallest tilt of any of the Solar System's planets (about 1⁄30 degree). Its orbital eccentricity is the largest of all known planets in the Solar System;[b] at perihelion, Mercury's distance from the Sun is only about two-thirds (or 66%) of its distance at aphelion. Mercury's surface appears heavily cratered and is similar in appearance to the Moon's, indicating that it has been geologically inactive for billions of years. Having almost no atmosphere to retain heat, it has surface temperatures that vary diurnally more than on any other planet in the Solar System, ranging from 100 K (−173 °C; −280 °F) at night to 700 K (427 °C; 800 °F) during the day across the equatorial regions.[22] The polar regions are constantly below 180 K (−93 °C; −136 °F). The planet has no natural satellites.
    
    Two spacecraft have visited Mercury: Mariner 10 flew by in 1974 and 1975; and MESSENGER, launched in 2004, orbited Mercury over 4,000 times in four years before exhausting its fuel and crashing into the planet's surface on April 30, 2015.[23][24][25] The BepiColombo spacecraft is planned to arrive at Mercury in 2025.`,
  },
  {
    name: "venus",
    distanceToSun: 0.7 * AU,
    inclinationFromSun: 3.394,
    period: {
      orbital: 224.7 * DAY_SECONDS,
      rotation: 243.019 * DAY_SECONDS,
    },
    radius: 6051.85,
    tangent_inclinationFromSun: Math.tan(MathUtils.degToRad(3.394)),
    summary: `Venus is the second planet from the Sun. It is sometimes called Earth's "sister" or "twin" planet as it is almost as large and has a similar composition. As an interior planet to Earth, Venus (like Mercury) appears in Earth's sky never far from the Sun, either as morning star or evening star. Aside from the Sun and Moon, Venus is the brightest natural object in Earth's sky, capable of casting visible shadows on Earth at dark conditions and being visible to the naked eye in broad daylight.[19][20]

    Venus is the second largest terrestrial object of the Solar System. It has a surface gravity slightly lower than on Earth and has a very weak induced magnetosphere. The atmosphere of Venus consists mainly of carbon dioxide, and, at the planet’s surface, is the densest and hottest of the atmospheres of the four terrestrial planets. With an atmospheric pressure at the planet's surface of about 92 times the sea level pressure of Earth and a mean temperature of 737 K (464 °C; 867 °F), the carbon dioxide gas at Venus's surface is in the supercritical phase of matter. Venus is shrouded by an opaque layer of highly reflective clouds of sulfuric acid, making it the planet with the highest albedo in the Solar System. It may have had water oceans in the past,[21][22] but after these evaporated the temperature rose under a runaway greenhouse effect.[23] The possibility of life on Venus has long been a topic of speculation but convincing evidence has yet to be found.
    
    Like Mercury, Venus does not have any moons.[24] Solar days on Venus, with a length of 117 Earth days,[25] are just about half as long as its solar year, orbiting the Sun every 224.7 Earth days.[26] This Venusian daylength is a product of it rotating against its orbital motion, halving its full sidereal rotation period of 243 Earth days, the longest of all the Solar System planets. Venus and Uranus are the only planets with such a retrograde rotation, making the Sun move in their skies from their western horizon to their eastern. The orbit of Venus around the Sun is the closest to Earth's orbit, bringing them closer than any other pair of planets. This occurs during inferior conjunction with a synodic period of 1.6 years. However, Mercury is more frequently the closest to each.
    
    The orbits of Venus and Earth result in the lowest gravitational potential difference and lowest delta-v needed to transfer between them than to any other planet. This has made Venus a prime target for early interplanetary exploration. It was the first planet beyond Earth that spacecraft were sent to, starting with Venera 1 in 1961, and the first planet to be reached, impacted and in 1970 successfully landed on by Venera 7. As one of the brightest objects in the sky, Venus has been a major fixture in human culture for as long as records have existed. It has been made sacred to gods of many cultures, gaining its mainly used name from the Roman goddess of love and beauty which it is associated with. Furthermore it has been a prime inspiration for writers, poets and scholars. Venus was the first planet to have its motions plotted across the sky, as early as the second millennium BCE.[27] Plans for better exploration with rovers or atmospheric missions, potentially crewed, at levels with almost Earth-like conditions have been proposed.`,
  },
  {
    name: "earth",
    distanceToSun: 1 * AU,
    inclinationFromSun: 7.25,
    period: {
      orbital: 365 * DAY_SECONDS,
      rotation: 1 * DAY_SECONDS,
    },
    radius: UNIT,
    tangent_inclinationFromSun: Math.tan(MathUtils.degToRad(7.25)),
    summary: `Earth is the third planet from the Sun and the only place in the universe known to harbor life. While large volumes of water can be found throughout the Solar System, only Earth sustains liquid surface water. Approximately 70.8% of Earth's surface is made up of the ocean, dwarfing Earth's polar ice, lakes, and rivers. The remaining 29.2% of Earth's surface is land, consisting of continents and islands. Earth's surface layer is formed of several slowly moving tectonic plates, which interact to produce mountain ranges, volcanoes, and earthquakes. Earth's liquid outer core generates the magnetic field that shapes the magnetosphere of the Earth, deflecting destructive solar winds.

    The atmosphere of Earth consists mostly of nitrogen and oxygen. Greenhouse gases in the atmosphere like carbon dioxide (CO2) trap a part of the energy from the Sun close to the surface. Water vapor is widely present in the atmosphere and forms clouds that cover most of the planet. More solar energy is received by tropical regions than polar regions and is redistributed by atmospheric and ocean circulation. A region's climate is governed not only by latitude but also by elevation and proximity to moderating oceans. In most areas, severe weather, such as tropical cyclones, thunderstorms, and heatwaves, occurs and greatly impacts life.
    
    Earth is an ellipsoid with a circumference of about 40,000 km. It is the densest planet in the Solar System. Of the four rocky planets, it is the largest and most massive. Earth is about eight light minutes away from the Sun and orbits it, taking a year (about 365.25 days) to complete one revolution. The Earth rotates around its own axis in slightly less than a day (in about 23 hours and 56 minutes). The Earth's axis of rotation is tilted with respect to the perpendicular to its orbital plane around the Sun, producing seasons. Earth is orbited by one permanent natural satellite, the Moon, which orbits Earth at 380,000 km (1.3 light seconds) and is roughly a quarter as wide as Earth. Through tidal locking, the Moon always faces the Earth with the same side, which causes tides, stabilizes Earth's axis, and gradually slows its rotation.
    
    Earth, like most other bodies in the Solar System, formed 4.5 billion years ago from gas in the early Solar System. During the first billion years of Earth's history, the ocean formed and then life developed within it. Life spread globally and began to affect Earth's atmosphere and surface, leading to the Great Oxidation Event two billion years ago. Humans emerged 300,000 years ago, and have reached a population of 8 billion today. Humans depend on Earth's biosphere and natural resources for their survival, but have increasingly impacted the planet's environment. Today, humanity's impact on Earth's climate, soils, waters, and ecosystems is unsustainable, threatening people's lives and causing widespread extinctions of other life.[27]`,
  },
  {
    name: "mars",
    distanceToSun: 1.5 * AU,
    inclinationFromSun: 5.65,
    period: {
      orbital: 686.971 * DAY_SECONDS,
      rotation: 1.026 * DAY_SECONDS,
    },
    radius: 3389.5,
    tangent_inclinationFromSun: Math.tan(MathUtils.degToRad(5.65)),
    summary: `Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, only being larger than Mercury. In the English language, Mars is named for the Roman god of war. Mars is a terrestrial planet with a thin atmosphere (less than 1% that of Earth's), and has a crust primarily composed of elements similar to Earth's crust, as well as a core made of iron and nickel. Mars has surface features such as impact craters, valleys, dunes and polar ice caps. It has two small and irregularly shaped moons, Phobos and Deimos.

    Some of the most notable surface features on Mars include Olympus Mons, the largest volcano and highest known mountain in the Solar System and Valles Marineris, one of the largest canyons in the Solar System. The Borealis basin in the Northern Hemisphere covers approximately 40% of the planet and may be a large impact feature.[21] Days and seasons on Mars are comparable to those of Earth, as the planets have a similar rotation period and tilt of the rotational axis relative to the ecliptic plane. Liquid water on the surface of Mars cannot exist due to low atmospheric pressure, which is less than 1% of the atmospheric pressure on Earth.[22][23] Both of Mars's polar ice caps appear to be made largely of water.[24][25] In the distant past, Mars was likely wetter, and thus possibly more suited for life. It is not known whether life has ever existed on Mars.
    
    Mars has been explored by several uncrewed spacecraft, beginning with Mariner 4 in 1965. NASA's Viking 1 lander transmitted the first images from the Martian surface in 1976. Two countries have successfully deployed rovers on Mars, the United States first doing so with Sojourner in 1997 and China with Zhurong in 2021.[26] There are also planned future missions to Mars, such as a NASA-ESA Mars Sample Return set to happen in 2026, and the Rosalind Franklin rover mission, which was intended to launch in 2018 but was delayed to 2024 at the earliest, with a more likely launch date at 2028.
    
    Mars can be viewed from Earth with the naked eye, as can its reddish coloring. This appearance, due to the iron oxide prevalent on its surface, has led to Mars often being called the Red Planet.[27][28] It is among the brightest objects in Earth's sky, with an apparent magnitude that reaches −2.94, comparable to that of Jupiter and surpassed only by Venus, the Moon and the Sun.[16] Historically, Mars has been observed since ancient times, and over the millennia has been featured in culture and the arts in ways that have reflected humanity's growing knowledge of it.`,
  },
  {
    name: "jupiter",
    distanceToSun: 5.2 * AU,
    inclinationFromSun: 6.09,
    period: {
      orbital: 4332.59 * DAY_SECONDS,
      rotation: 0.414 * DAY_SECONDS,
    },
    radius: 69911,
    tangent_inclinationFromSun: Math.tan(MathUtils.degToRad(6.09)),
    summary: `Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, while being slightly less than one-thousandth the mass of the Sun. Jupiter is the third brightest natural object in the Earth's night sky after the Moon and Venus, and it has been observed since prehistoric times. It was named after Jupiter, the chief deity of ancient Roman religion.

    Jupiter is primarily composed of hydrogen, but helium constitutes one-quarter of its mass and one-tenth of its volume. It probably has a rocky core of heavier elements, but (like the Solar System's other giant planets) lacks a well-defined solid surface. The ongoing contraction of Jupiter's interior generates more heat than the planet receives from the Sun. Because of its rapid rotation, the planet's shape is an oblate spheroid, having a slight but noticeable bulge around the equator. The outer atmosphere is divided into a series of latitudinal bands, with turbulence and storms along their interacting boundaries. A prominent result of this is the Great Red Spot, a giant storm which has been observed since at least 1831.
    
    Jupiter is surrounded by a faint planetary ring system and a powerful magnetosphere. The planet's magnetic tail is nearly 800 million kilometres (5.3 astronomical units; 500 million miles) long, covering nearly the entire distance to Saturn's orbit. Jupiter has 84 known moons and likely many more, including the four large moons discovered by Galileo Galilei in 1610: Io, Europa, Ganymede, and Callisto. Io and Europa are about the size of Earth's Moon, Ganymede is larger than the planet Mercury, and Callisto slightly smaller than Ganymede.
    
    Pioneer 10 was the first spacecraft to visit Jupiter, making its closest approach to the planet in December 1973. Jupiter has since been explored by multiple robotic spacecraft, beginning with the Pioneer and Voyager flyby missions from 1973 to 1979, and later with the Galileo orbiter in 1995. In 2007, New Horizons visited Jupiter using its gravity to increase its speed, bending its trajectory en route to Pluto. The latest probe to visit Jupiter, Juno, entered its orbit in July 2016. Future targets for exploration in the Jupiter system include Europa, which likely has an ice-covered liquid ocean.`,
  },
  {
    name: "saturn",
    distanceToSun: 9.5 * AU,
    inclinationFromSun: 5.51,
    period: {
      orbital: 10756.2 * DAY_SECONDS,
      rotation: 0.444 * DAY_SECONDS,
    },
    radius: 60268,
    tangent_inclinationFromSun: Math.tan(MathUtils.degToRad(5.51)),
    summary: `Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth.[23][24] It has only one-eighth the average density of Earth, but is over 95 times more massive.[25][26][27]

    Saturn's interior is most likely composed of a rocky core, surrounded by a deep layer of metallic hydrogen, an intermediate layer of liquid hydrogen and liquid helium, and finally, a gaseous outer layer. Saturn has a pale yellow hue due to ammonia crystals in its upper atmosphere. An electrical current within the metallic hydrogen layer is thought to give rise to Saturn's planetary magnetic field, which is weaker than Earth's, but which has a magnetic moment 580 times that of Earth due to Saturn's larger size. Saturn's magnetic field strength is around one-twentieth of Jupiter's.[28] The outer atmosphere is generally bland and lacking in contrast, although long-lived features can appear. Wind speeds on Saturn can reach 1,800 kilometres per hour (1,100 miles per hour), higher than on Jupiter but not as high as on Neptune.[29]
    
    The planet's most notable feature is its prominent ring system, which is composed mainly of ice particles, with a smaller amount of rocky debris and dust. At least 83 moons[30] are known to orbit Saturn, of which 53 are officially named; this does not include the hundreds of moonlets in its rings. Titan, Saturn's largest moon and the second largest in the Solar System, is larger (while less massive) than the planet Mercury and is the only moon in the Solar System to have a substantial atmosphere.[31]`,
  },
];

export function getStarDatas(isVirtualized: boolean) {
  if (cached) {
    return cached;
  } else {
    const result = isVirtualized ? virtualizeMeasurements(realStarDatas) : realStarDatas;
    cached = result;
    return result;
  }
}
