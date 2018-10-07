module.exports = function LetMeDrink(mod) {
  const preset = require('./preset')
  const jobId = () => (mod.game.me.templateId - 10101) % 100
  const skillGroup = (x) => Math.floor(x / 10000)
  let enabled = true
  let cooldown = false

  mod.command.add(['letmedrink', 'lmd'], () => {
    enabled = !enabled
    mod.command.message(`${enabled ? 'en' : 'dis'}abled`)
  })

  function drinkBeer() {
    if (!enabled || cooldown || mod.game.me.zone === 9713)
      return

    setTimeout(() => { cooldown = false }, 60000)
    mod.toServer('C_USE_ITEM', 3, {
      gameId: mod.game.me.gameId,
      id: 80081
    })
    cooldown = true
  }

  mod.hook('C_USE_ITEM', 3, event => {
    if (mod.game.me.is(event.gameId) && event.id === 51028)
      drinkBeer()
  })

  mod.hook('C_START_SKILL', (mod.majorPatchVersion >= 74) ? 7 : 6, event => {
    const jobpreset = preset[jobId()] || {}
    if (jobpreset[skillGroup(event.skill.id)])
      drinkBeer()
  })
}