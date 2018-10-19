module.exports = function LetMeDrink(mod) {
  const jobId = () => (mod.game.me.templateId - 10101) % 100
  const skillGroup = (x) => Math.floor(x / 10000)
  let cooldown = false

  mod.command.add(['letmedrink', 'lmd'], () => {
    mod.settings.enabled = !mod.settings.enabled
    mod.command.message((mod.settings.enabled ? 'en' : 'dis') + 'abled')
  })

  function drinkBeer() {
    setTimeout(() => { cooldown = false }, 60000)
    mod.toServer('C_USE_ITEM', 3, {
      gameId: mod.game.me.gameId,
      id: 80081
    })
    cooldown = true
  }

  mod.hook('C_USE_ITEM', 3, event => {
    if (!mod.settings.enabled || cooldown || mod.settings.excludeZones.includes(mod.game.me.zone))
      return

    if (mod.game.me.is(event.gameId) && event.id === 51028)
      drinkBeer()
  })

  mod.hook('C_START_SKILL', (mod.majorPatchVersion >= 74) ? 7 : 6, event => {
    if (!mod.settings.enabled || cooldown || mod.settings.excludeZones.includes(mod.game.me.zone))
      return

    if ((mod.settings.presets[jobId()] || {})[skillGroup(event.skill.id)])
      drinkBeer()
  })
}