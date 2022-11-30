export const validateJsonFields = (obj: Object, validators: string[]) => {
  return validators.every(
    (key) =>
      ![undefined, null].includes(
        key.split('.').reduce((acc: any, cur: any) => acc?.[cur], obj)
      )
  );
};

export const userValidators = [
  'name',
  'username',
  'email',
  'date_of_birth',
  'phone',
  'is_admin',
  'language',
];

export const postValidators = ['user_id', 'title', 'content', 'language'];

export const commentValidators = ['user_id', 'content'];
