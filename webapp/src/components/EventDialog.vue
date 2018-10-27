<template>
  <v-dialog v-model="value" width="480px" persistent>
    <v-card>
      <v-card-title class="headline">{{headline}}</v-card-title>
      <div style="padding: 20px;">
        <v-form v-model="valid">
          <v-text-field outline label="Title"
            v-model="event.title"
            :rules="titleRules" required
          ></v-text-field>
          <datetime-picker label="Start"
            v-model="event.start"
          ></datetime-picker>
          <datetime-picker label="End"
            v-model="event.end"
            :error-message="rangeErrorMessage"
          ></datetime-picker>
        </v-form>
      </div>
      <v-card-actions>
        <v-btn color="brown" flat
          @click="() => $emit('input', false)"
        >Cancel</v-btn>
        <v-btn color="red"
          v-if="mode === 'patch'"
          @click="() => $emit(`${mode}:event`, event)"
        >Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="yellow" :disabled="!(isValidRange && valid)"
          @click="() => $emit(`${mode}:event`, event)"
        >OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import DatetimePicker from './DatetimePicker.vue';

export default {
  components: {
    DatetimePicker,
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    mode: String,
    event: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      valid: false,
      titleRules: [
        v => !!v || 'Title is required',
      ],
    };
  },
  computed: {
    headline() {
      switch (this.mode) {
        case 'post':
          return 'Create Event';
        case 'patch':
          return 'Modify Event';
        case 'delete':
          return 'Delete Event';
        default:
          return 'Event';
      }
    },
    isValidRange() {
      return this.event.start < this.event.end;
    },
    rangeErrorMessage() {
      return (this.isValidRange)
        ? ''
        : 'End date must be later than start date';
    },
  },
  watch: {
    ['event.start']() {
      console.log(this.event.start);
    },
    ['event.end']() {
      console.log(this.event.end);
    },
  },
};
</script>
