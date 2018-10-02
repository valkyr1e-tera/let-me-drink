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

  mod.hook('C_START_SKILL', (mod.base.majorPatchVersion >= 74) ? 7 : 6, event => {
    if (!enabled || cooldown)
      return

    const jobpreset = preset[jobId()] || {}
    if (jobpreset[skillGroup(event.skill.id)]) {
      setTimeout(() => { cooldown = false }, 60000)
      mod.toServer('C_USE_ITEM', 3, {
        gameId: mod.game.me.gameId,
        id: 80081
      })
      cooldown = true
    }
  })
}