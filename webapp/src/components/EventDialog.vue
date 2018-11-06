<template>
  <v-dialog v-if="event" v-model="value" width="480px" persistent>
    <v-card>
      <v-card-title class="headline">{{headline}}</v-card-title>
      <div style="padding: 20px;">
        <v-form v-model="valid">
          <v-text-field outline background-color="brown" label="Title"
            v-model="event.title"
            :rules="titleRules" required
          ></v-text-field>
          <datetime-picker background-color="brown" label="Start"
            v-model="event.start"
          ></datetime-picker>
          <datetime-picker background-color="brown" label="End"
            v-model="event.end"
            :error-message="rangeErrorMessage"
          ></datetime-picker>
        </v-form>
      </div>
      <v-card-actions>
        <v-btn color="red" flat
          v-if="mode === 'patch'"
          @click="handleClickDelete"
        >Delete</v-btn>
        <v-spacer></v-spacer>
        <v-btn flat
          @click="handleClickCancel"
        >Cancel</v-btn>
        <v-btn color="yellow" :disabled="!(isValidRange && valid)"
          @click="handleClickSave"
        >Save</v-btn>
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
  methods: {
    closeDialog() {
      this.$emit('input', false);
    },
    handleClickCancel() {
      this.closeDialog();
    },
    handleClickSave() {
      this.$emit(`${this.mode}:event`, this.event);
      this.closeDialog();
    },
    handleClickDelete() {
      this.$emit('delete:event', this.event);
      this.closeDialog();
    },
  },
};
</script>
