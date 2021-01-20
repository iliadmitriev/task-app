import Vue from "vue";

const filterTruncate = (text, length, clamp = '...') => {
    if (!text || text.length === 0 || text.length <= length - clamp.length) {
        return text
    } else {
        return text.substring(0, length) + clamp
    }
}

const dateFormat = (value) => {
    if (Date.parse(value)) {
        return new Date(value).toLocaleDateString('fr-CA')
    } else {
        return value
    }
}

Vue.filter('truncate', filterTruncate)
Vue.filter('dateFormat', dateFormat)
