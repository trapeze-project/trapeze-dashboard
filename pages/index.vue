<template>
  <div>
    <h1>lol</h1>
  </div>
</template>

<script>

export default {
  middleware({ params, store, redirect ,app}) {
    //  }
    let redirectTo = app.localePath('service-selection')
    return redirect(redirectTo)
  },
  layout: 'empty',
}
</script>
